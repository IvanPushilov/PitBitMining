const express = require("express");
const router = express.Router();const multer = require('multer');
const {Post} = require("../../db/models");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/postsMedia');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});



router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json({ posts });
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

const upload = multer({
  storage,
  limits: {
    fieldSize: Infinity,
    fields: 20, // количество файлов, которые можно загрузить
  },
  fileFilter(req, file, cb) {
    if (file.fieldname === 'img' || file.fieldname === 'video' || file.fieldname === 'preview') {
      cb(null, true);
    } else {
      return cb(new Error('Unexpected field'));
    }
  }
});

router.post("/posts", upload.any(), async (req, res) => {  
  try {    
    const { title, text} = req.body;

    let newFileUrl = '';
    let imgUrls = [];
    let videoUrl = [];

    if (req.file) {
			newFileUrl = `/postsMedia/${req.file.originalname}`;
		}


    if (Array.isArray(req.files)) {
      req.files.forEach(file => {
        if (file.fieldname === 'img') {
          imgUrls.push(`/postsMedia/${file.originalname}`);
        } else if (file.fieldname === 'video') {
          videoUrl.push(`/postsMedia/${file.originalname}`);
        }  else if (file.fieldname === 'preview') {
          newFileUrl = `/postsMedia/${file.originalname}`;
        }
      });
    }

    const post = await Post.create({
      title,
      text,
      img: imgUrls,
      video: videoUrl,
      preview: newFileUrl,
    });

    res.json({ post });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;