const router = require('express').Router();
const { Service } = require('../../db/models');

router.post('/service', async (req, res) => {
	try {
		const { price } = req.body;
		const service = await Service.create({ price });
			res.json({service});
	} catch ({ message }) {
		res.json({ type: 'service router', message });
	}
});

router.put('/service/', async (req, res) => {
	try {
		const { id, price } = req.body;
        const service = await Service.findOne({ where: { id: id } });
		if (!service) {
			return res.status(404).json({ message: 'Service не получил айди из бади' });
		}
		service.price = +price; 
		await service.save(); 

		res.json({service}); 
	} catch ({ message }) {
		res.status(400).json({ message });
	}
});

router.get('/', async (req, res) => {
	try {
		const services = await Service.findAll();
		await res.json({services});
		} catch ({ message }) {
		res.json(message);
	}
});
module.exports = router;
