const express = require("express");
const router = express.Router();
const { Comment, User, Miner } = require("../../db/models");

router.post('/', async (req, res) => {
	try {
		const { title, miner_id } = req.body;

		if (res.locals.user) {
			const commentAdd = await Comment.create({
				miner_id: +miner_id,
				title,
				user_id: res.locals.user.id,
			});
			const commentUser = await Comment.findOne({
				include: { model: User },
				where: { id: commentAdd.id },
			});
			res.json({ commentUser });
		}
	} catch ({ message }) {
		res.json({ type: 'comment router', message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const comments = await Comment.findAll({
			include: { model: User },
			where: { miner_id: +id },
		});
		res.json(comments);
	} catch ({ message }) {
		res.json({ type: 'comment router', message });
	}
});




module.exports = router;
