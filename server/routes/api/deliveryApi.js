const router = require('express').Router();
const {
	Delivery,
	Order,
	User,
	Miner,
	OrderItem,
} = require('../../db/models');

router.post('/', async (req, res) => {
	try {
		const {
			first_name,
			middle_name,
			last_name,
			phone,
			passport,
			address,
			city,
			order_id,
			delivery_method,
			company_name,
			inn
		} = req.body;

		console.log('!----------------------------------!',req.body);
		

		if (res.locals.user) {
			if (
				first_name &&
				middle_name &&
				last_name &&
				phone &&
				city &&
				passport &&
				address &&
				order_id &&
				delivery_method
			) {
				const delivery = await Delivery.create({
					passport,
					first_name,
					middle_name,
					last_name,
					address,
					city,
					phone,
					status: 'Оплачено',
					order_id,
					delivery_method,
					inn,
					company_name,
				});
				const updateOrder = Order.update(
					{ status: 'Оплачено' },
					{ where: { id: delivery.order_id } }
				);
				res.json({updateOrder});
			} else {
				res.json({ message: 'Заполните все полня' });
			}
		}
	} catch ({ message }) {
		res.json({ type: 'delivery router', message });
	}
});

router.get('/', async (req, res) => {
	try {
		let orders;
		orders = await Order.findAll({
			include: [
				{ model: Delivery },
				{ model: OrderItem, include: { model: Miner } },
			],
			where: { user_id: res.locals.user.id, status: 'Оплачено' },
		});

		res.json({orders});
	} catch ({ message }) {
		res.json({ type: 'comment router', message });
	}
});

module.exports = router;
