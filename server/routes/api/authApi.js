const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const generateTokens = require('../../utils/authUtils');
const cookiesConfig = require('../../middleware/cookiesConfig');
const configJWT = require('../../middleware/jwtConfig');
const {User} = require('../../db/models');
const {verifyAccessToken} = require('../../middleware/verifyToken');


router.post('/sign-up', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (name && email && password && phone) {
      const globalRegex =
        /^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
        const phoneRegex = /^(?:\+7|8)\s*\(?\d{3}\)?\s*\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

      if (globalRegex.test(email)) {
        if (phoneRegex.test(phone)) {
        let user = await User.findOne({ where: { email } });
        if (user) {
          res
            .status(400)
            .json({ message: 'Такой пользователь уже существует' });
        } else {
          const hash = await bcrypt.hash(password, 10);
          user = await User.create({
            name,
            email,
            password: hash,
            phone,
          });
          const { accessToken, refreshToken } = generateTokens({
            user: { name: user.name, id: user.id},
          });
          res.cookie(cookiesConfig.access, accessToken, {
            maxAge: parseInt( cookiesConfig.maxAgeAccess),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          });
          res.cookie(cookiesConfig.refresh, refreshToken, {
            maxAge: parseInt( cookiesConfig.maxAgeRefresh),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          });
          res.status(201).json({
            message: 'success',
            user,
          });
        }
      } else {
        res
          .status(400)
          .json({ message: 'Ваша почта не соответствует формату' });
      }
    } else{
      res
            .status(400)
            .json({ message: 'Некорректный номер телефона' });
    }
    } else {
      res.status(400).json({ message: 'Заполните все поля' });
    }
  } catch ({message}) {
    res.status(500).json({message})
  }
})

router.post('/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        const { accessToken, refreshToken } = generateTokens({
          user: { email: email, id: user.id, role: user.role },
        });

        res.cookie(cookiesConfig.access, accessToken, {
          maxAge: parseInt( cookiesConfig.maxAgeAccess),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });
        res.cookie(cookiesConfig.refresh, refreshToken, {
          maxAge: parseInt( cookiesConfig.maxAgeRefresh),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json({ message: 'success', user });
      } else {
        res.status(400).json({ message: 'логин или пароль не верный' });
      }
    } else {
      res.status(400).json({ message: 'Заполните все поля' });
    }
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

router.get('/check', verifyAccessToken, async (req, res) => {
  if (res.locals.user) {
    const user = await User.findOne({
      where: { id: res.locals.user.id },
      attributes: { exclude: ['password'] },
    });
    res.json({ user });
    return;
  }
  res.json({ user: null });
});

router.get('/logout', (req, res) => {
  res.clearCookie(configJWT.access.type).clearCookie(configJWT.refresh.type);
  res.json({ message: 'success' });
});


module.exports = router