const express = require("express");
const router = express.Router();
const {Brand} = require("../../db/models");


router.get("/", async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.json({ brands });
    } catch ({ message }) {
        res.status(500).json(message);
    }
});


router.post("/brands",async (req, res) => {
    const { name } = req.body; 
    try {
      const brand = await Brand.create({ name });
      res.json({ brand });
    } catch ({ message }) {
        console.error('Ошибка при создании объекта Brand:', message);
      res.status(500).json({ message });
    }
  });


router.delete("/brands/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.destroy({ where: { id } });
        res.json({ brand });
    } catch ({ message }) {
        res.json({ message: message });
    }
});

module.exports = router;