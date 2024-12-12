const express = require("express");
const router = express.Router();
const {Miner} = require("../../db/models");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const crypto = require('crypto');



const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/filestorage');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

router.get("/miners", async (req, res) => {
  try {
    const miners = await Miner.findAll();
    res.json({ miners });
  } catch ({ message }) {
    res.status(500).json(message);
  }
});





router.post("/miners", upload.array('img'), async (req, res) => {  
  try {    
    const { about, price, description, expense, brand_id, subbrand_id, modell_id, algorithm_id, currency_id, hashrate_id, volt, cooling, temp, size, loud } = req.body;
    const currencyIds = req.body.currency_id.split(',').map((id) => parseInt(id));

   
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',req.files);

    // Проверка на существование майнера с такими же параметрами
    const existingMiner = await Miner.findOne({
      where: {
        about,
        price,
        description,
        expense,
        brand_id,
        subbrand_id,
        modell_id,
        algorithm_id,
        hashrate_id,
        volt,
        cooling,
        temp,
        size,
        loud
      }
    });

    if (existingMiner) {
      return res.status(400).json({ message: "Майнер с такими параметрами уже существует." });
    }

    const folderPath = path.join(__dirname, '../../public/filestorage', `${brand_id}_${subbrand_id}_${modell_id}_${algorithm_id}_${currency_id}_${hashrate_id}`);
    console.log(`Создаем папку: ${folderPath}`);
    await mkdirp(folderPath);

    let fileUrls = [];

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      fileUrls = req.files.map(file => {
        const fileBuffer = fs.readFileSync(file.path);
        const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
        const uniqueFileName = `${hash}_${file.originalname}`;
        const filePath = path.join(folderPath, uniqueFileName);

        console.log(`Проверяем файл: ${file.path}`);

        if (!fs.existsSync(filePath)) {
          console.log(`Перемещаем файл: ${file.path} -> ${filePath}`);
          fs.renameSync(file.path, filePath);
        } else {
          console.log(`Файл уже существует: ${filePath}`);
        }

        return `/filestorage/${brand_id}_${subbrand_id}_${modell_id}_${algorithm_id}_${currency_id}_${hashrate_id}/${uniqueFileName}`;
      });
    }

    const miner = await Miner.create({
      about,
      price,
      description,
      expense,
      brand_id,
      subbrand_id,
      modell_id,
      algorithm_id,
      currency_id: currencyIds,
      hashrate_id,
      img: fileUrls,
      volt,
      cooling,
      temp,
      size,
      loud
    });

    res.json({ miner });
  } catch (error) {
    res.json({ message: error.message, message2: 'sdada'});
  }
});








router.put("/miners/:id", upload.array('img'), async (req, res) => {
  try {
    const { id } = req.params;
    const { about, price, description, expense, brand_id, subbrand_id, modell_id, algorithm_id, currency_id, hashrate_id, volt, cooling, temp, size, loud } = req.body;
    
    const miner = await Miner.findOne({ where: { id: id } });

    if (!miner) {
      return res.status(404).json({ message: "Miner not found" });
    }

    // Путь к папке с изображениями
    const folderPath = path.join(__dirname, '../../public/filestorage', `${miner.subbrand_id}_${miner.modell_id}`);
    
    // Создаем папку, если она не существует
    await mkdirp(folderPath);

    let fileUrls = [];
    
    // Проверяем, есть ли загруженные файлы
    if (Array.isArray(req.files) && req.files.length > 0) {
      fileUrls = req.files.map(file => {
        const filePath = path.join(folderPath, file.originalname);
        fs.renameSync(file.path, filePath); // Перемещаем файл в папку
        return `/filestorage/${miner.subbrand_id}_${miner.modell_id}/${file.originalname}`;
      });
    }

    // Обновляем данные майнера, добавляя новые изображения
    const updatedImages = miner.img.concat(fileUrls); // Добавляем новые изображения к существующим
    await Miner.update({
      price: price,
      description: description,
      expense: expense,
      brand_id: brand_id,
      subbrand_id: subbrand_id,
      modell_id: modell_id,
      algorithm_id: algorithm_id,
      currency_id: currency_id,
      hashrate_id: hashrate_id,
      about: about,
      img: updatedImages,
      volt: volt,
      cooling: cooling,
      temp: temp,
      size: size,
      loud: loud
    }, { where: { id: id } });

    res.json({ message: "Miner updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred: " + error.message });
  }
});



router.delete("/miners/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const miner = await Miner.findByPk(id);
    if (!miner) {
      return res.status(404).json({ message: "Miner not found" });
    }

    const imageUrls = Array.isArray(miner.img) ? miner.img : JSON.parse(miner.img);
    const folderPath = path.join(__dirname, '../../public/filestorage', `${miner.subbrand_id}_${miner.modell_id}`);
    
    if (fs.existsSync(folderPath)) {
      for (const url of imageUrls) {
        const imagePath = path.join(__dirname, '../../public', url.slice(1));
        await fs.promises.unlink(imagePath).catch(err => {
          console.error("Error deleting image:", err);
          return res.status(500).json({ message: "Error deleting image" });
        });
      }

      await fs.promises.rmdir(folderPath, { recursive: true }).catch(err => {
        console.error("Error deleting folder:", err);
        return res.status(500).json({ message: "Error deleting folder" });
      });
    } else {
      console.log("Folder does not exist, skipping deletion of images.");
    }

    await Miner.destroy({ where: { id } });
    res.json({ message: "Miner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred: " + error.message });
  }
});


module.exports = router;
