const router = require('express').Router();
const { Order, OrderItem, Miner, Favorite } = require('../../db/models');

router.post('/:id', async (req, res) => {
	try {
		const { id } = req.body;

		if (res.locals.user) {
			const favoriteCreate = await Favorite.create({
				user_id: res.locals.user.id,
				miner_id: id,
			});
			const favorite = await Favorite.findOne({
				include: { model: Miner },
				where: { id: favoriteCreate.id },
			});
			res.json(favorite);
		}
	} catch ({ message }) {
		res.json({ type: 'favorite router', message });
	}
});

router.delete('/item/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const orderDelete = await Favorite.destroy({ where: { miner_id: id } });

		if (orderDelete) {
			res.json(+id);
		}
	} catch ({ message }) {
		res.json(message);
	}
});

router.get('/', async (req, res) => {
	try {
		if (res.locals.user) {
			const favorite = await Favorite.findAll({
				include: [{ model: Miner }],
				where: { user_id: res.locals.user.id },
			});
			res.json(favorite);
		}
	} catch ({ message }) {
		res.json(message);
	}
});
module.exports = router;
