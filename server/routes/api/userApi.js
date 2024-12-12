const express = require("express");
const router = express.Router();
const { User } = require("../../db/models");
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/userImg');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });


router.put('/update', upload.single('img'), async (req, res) => {
	try {
		const { name, email } = req.body;

		let newFileUrl = '';
		if (req.file) {
			newFileUrl = `/userImg/${req.file.originalname}`;
		}
		const user = await User.findOne({
			where: { id: res.locals.user.id },
		});

		if (newFileUrl) {
			await user.update(
				{ name, email, img: newFileUrl },
				{ where: { id: res.locals.user.id } }
			);
		} else {
			await user.update(
				{ name, email },
				{ where: { id: res.locals.user.id } }
			);
		}
    res.json({ user });
  } catch ({ message }) {
    res.json({ message: message });
  }
});


module.exports = router;
