const express = require("express");
const router = express.Router();
const { SubBrand } = require("../../db/models");
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/profileImg');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
    try {
        const subbrands = await SubBrand.findAll();
        res.json({ subbrands });
    } catch ({ message }) {
        res.status(500).json(message);
    }
});

router.post("/subbrands", upload.single('img'), async (req, res) => {
    try{
    const { name } = req.body;
    let fileUrl = '';
    if(req.file){
        fileUrl = `/profileImg/${req.file.originalname}`
    }
    const subbrand = await SubBrand.create({ name, img: fileUrl });
    res.json({ subbrand });
    } catch ({ message }) {
        console.error('Ошибка при создании объекта SubBrand:', message);
        res.status(500).json(message);
    }
});

router.delete("/subbrands/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const subbrand = await SubBrand.destroy({ where: { id } });
        res.json({ subbrand });
    } catch ({ message }) {
        res.json({ message: message });
    }
});

module.exports = router