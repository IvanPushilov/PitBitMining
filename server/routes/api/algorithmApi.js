const express = require("express");
const router = express.Router();
const {Algorithm} = require("../../db/models");
const multer = require('multer');
const upload = multer();

router.get("/", async (req, res) => {
    try {
        const algorithms = await Algorithm.findAll();
        res.json({ algorithms });
    } catch ({ message }) {
        res.status(500).json(message);
    }
});

router.post("/algorithms", upload.none(), async (req, res) => {
    const { algo } = req.body;
    try{
    const algorithm = await Algorithm.create({ algo });
    res.json({ algorithm });
    } catch ({ message }) {
        console.error('Ошибка при создании объекта Algorithm:', message);
        res.status(500).json(message);
    }
});

router.delete("/algorithms/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const algorithm = await Algorithm.destroy({ where: { id } });
        res.json({ algorithm });
    } catch ({ message }) {
        res.json({ message: message });
    }
});

module.exports = router;