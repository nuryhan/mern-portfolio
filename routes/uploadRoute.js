const router = require("express").Router();
require("dotenv").config();
const cloudinary = require("cloudinary");
const fs = require("fs");

// we will upload image to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

// post upload image
router.post("/upload", (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("no files uploaded");
    }
    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "size is too big" });
    }
    if (file.mimetype !== "image/jpg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: " incorrect file format" });
    }
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "meninsurat" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete image
router.post("/remove", (req, res) => {
  const { public_id } = req.body;

  try {
    if (!public_id) {
      return res.status(400).json({ msg: "No images selected" });
    }

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: "image deleted" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
