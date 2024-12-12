const express = require("express");
const router = express.Router();
const { Currency } = require("../../db/models");


router.get("/", async (req, res) => {
    try {
        const currencies = await Currency.findAll();
        res.json({ currencies });
    } catch ({ message }) {
        res.status(500).json(message);
    }
});

router.post("/currencies", async (req, res) => {
    try{
    const { name } = req.body;
    const currency = await Currency.create({ name });
    res.json({ currency });
    } catch ({ message }) {
        res.status(500).json(message);
    }
});

router.delete("/currencies/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const currency = await Currency.destroy({ where: { id } });
        res.json({ currency });
    } catch ({ message }) {
        res.json({ message: message });
    }
});

module.exports = router