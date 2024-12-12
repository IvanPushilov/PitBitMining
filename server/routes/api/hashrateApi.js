const express = require("express");
const router = express.Router();
const { Hashrate } = require("../../db/models");


router.get("/", async (req, res) => {
    try {
        const hashrates = await Hashrate.findAll();
        res.json({ hashrates });
    } catch ({ message }) {
        res.status(500).json(message);
    }
});

router.post("/hashrates", async (req, res) => {
    try{
    const { rate } = req.body;    
    const hashrate = await Hashrate.create({ rate });
    res.json({ hashrate });
    } catch ({ message }) {
        res.status(500).json(message);
    }
});

router.delete("/hashrates/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const hashrate = await Hashrate.destroy({ where: { id } });
        res.json({ hashrate });
    } catch ({ message }) {
        res.json({ message: message });
    }
});

module.exports = router