const router = require('express').Router();
const { Order, OrderItem, Miner, Service } = require('../../db/models');

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const orderItem = await OrderItem.findOne({ where: { miner_id: id } });
		if (!orderItem) {
			return res.status(404).json({ message: 'Товар не найден' });
		}
		await OrderItem.destroy({ where: { miner_id: id } });
		const order = await Order.findOne({ where: { id: orderItem.order_id } });
		const price = orderItem.price * orderItem.count;
		order.total_price -= price;
		await order.save();
		res.json({ id, order });
	} catch ({ message }) {
		res.json(message);
	}
});

router.post('/', async (req, res) => {
	try {
		const { id, service_id } = req.body;
		if (res.locals.user) {
			const orderCheck = await Order.findOne({
				where: { user_id: res.locals.user.id, status: 'Корзина' },
			});

			const miner = await Miner.findOne({ where: { id } });
			if (!miner) {
				return res.status(404).json({ message: 'Минер не найден' });
			}

			let totalPriceToAdd = miner.price; // Начальная стоимость только минера

			// Проверяем, если service_id не равен 0, то добавляем стоимость услуги
			if (service_id) {
				const service = await Service.findOne({ where: { id: service_id } });
				if (!service) {
					return res.status(404).json({ message: 'Услуга не найдена' });
				}
				totalPriceToAdd += service.price; // Добавляем стоимость услуги
			}

			if (orderCheck) {
				const orderItem = await OrderItem.findOne({
					where: { order_id: orderCheck.id, miner_id: miner.id },
				});

				if (orderItem) {
					await OrderItem.update(
						{ count: orderItem.count + 1 },
						{ where: { id: orderItem.id } }
					);
				} else {
					await OrderItem.create({
						order_id: orderCheck.id,
						count: 1,
						miner_id: miner.id,
						price: miner.price,
						service_id: service_id || null, // Добавляем ID услуги, если он есть
					});
				}
				orderCheck.total_price += totalPriceToAdd;
				await orderCheck.save();
				res.json({ message: 'Товар добавлен в корзину' });
			} else {
				const orderCreate = await Order.create({
					status: 'Корзина',
					user_id: res.locals.user.id,
					total_price: totalPriceToAdd,
				});
				await OrderItem.create({
					order_id: orderCreate.id,
					miner_id: miner.id,
					price: miner.price,
					total_price: totalPriceToAdd,
					count: 1,
					service_id: service_id || null, // Добавляем ID услуги, если он есть
				});
				res.json({ message: 'Корзина создана и товар добавлен' });
			}
		} else {
			res.status(401).json({ message: 'Пользователь не авторизован' });
		}
	} catch (error) {
		res.status(500).json({ type: 'order router', message: error.message });
	}
});

// Получение товаров из корзины
router.get('/order', async (req, res) => {
	try {
		if (res.locals.user) {
			const orders1 = await Order.findOne({
				where: { user_id: res.locals.user.id, status: 'Корзина' },
			});

			if (orders1) {
				const orders = await OrderItem.findAll({
					include: [{ model: Miner }, { model: Order }],
					where: { order_id: orders1.id },
				});
				res.json({ orders, message: 'ok' });
			} else {
				res.json({ message: 'Корзина пуста' });
			}
		} else {
			res.status(401).json({ message: 'Пользователь не авторизован' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Увеличение количества товара в корзине
router.post('/increase', async (req, res) => {
	try {
		const { id } = req.body;
		const orderItem = await OrderItem.findOne({ where: { miner_id: id } });

		if (!orderItem) {
			return res.status(404).json({ message: 'Товар не найден' });
		}

		const service = await Service.findOne({ where: { id: orderItem.service_id } });
		const additionalPrice = service ? service.price : 0; // Получаем стоимость услуги, если она есть

		orderItem.count += 1;
		await orderItem.save();

		const order = await Order.findOne({ where: { id: orderItem.order_id } });
		order.total_price += orderItem.price + additionalPrice; // Увеличиваем общую стоимость на стоимость минера и услуги
		await order.save();

		res.json({ message: 'Количество увеличено', orderItem });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Уменьшение количества товара в корзине
router.post('/decrease', async (req, res) => {
	try {
		const { id } = req.body;
		const orderItem = await OrderItem.findOne({ where: { miner_id: id } });

		if (!orderItem) {
			return res.status(404).json({ message: 'Товар не найден' });
		}

		const service = await Service.findOne({ where: { id: orderItem.service_id } });
		const additionalPrice = service ? service.price : 0; // Получаем стоимость услуги, если она есть

		if (orderItem.count > 1) {
			orderItem.count -= 1;
			await orderItem.save();

			const order = await Order.findOne({ where: { id: orderItem.order_id } });
			order.total_price -= (orderItem.price + additionalPrice); // Уменьшаем общую стоимость на стоимость минера и услуги
			await order.save();

			res.json({ message: 'Количество уменьшено', orderItem });
		} else {
			res.status(400).json({ message: 'Количество не может быть меньше 1' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
