const express = require("express");
const router = express.Router();
const { Modell } = require("../../db/models");


router.get("/", async (req, res) => {
    try {
        const modells = await Modell.findAll();
        res.json({ modells });
    } catch ({ message }) {
        res.status(500).json(message);
    }
});

router.post("/modells", async (req, res) => {
    try{
    const { name } = req.body;
    const modell = await Modell.create({ name });
    res.json({ modell });
    } catch ({ message }) {
        res.status(500).json(message);
    }
});

router.delete("/modells/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const modell = await Modell.destroy({ where: { id } });
        res.json({ modell });
    } catch ({ message }) {
        res.json({ message: message });
    }
});

module.exports = router;