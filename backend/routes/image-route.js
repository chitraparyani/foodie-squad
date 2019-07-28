const express = require("express");
const multer = require("multer");

const Image = require("../models/image");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post("",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const image = new Image({
      userId: req.body.userId,
      imagePath: url + "/images/" + req.file.filename
    });
    image.save().then(createdImage => {
      res.status(201).json({
        message: "Image added successfully",
        image: {
          ...createdImage,
          id: createdImage._id
        }
      });
    });
  });

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const image = new Image({
      _id: req.body.id,
      userId: req.body.userId,
      imagePath: imagePath
    });
    console.log(image);
    Image.updateOne({ _id: req.params.id }, image).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  let fetchedImages;
  Image.find()
  .then(documents => {
    fetchedImages = documents
    return Image.count();
  })
  .then(count => {
    res.status(200).json({
      message: "Images fetched successfully!",
      images: fetchedImages,
      maxImages: count
    });
  });
});

router.get("/findOne/:id", (req, res, next) => {
  Image.findById(req.params.id).then(image => {
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ message: "Image not found!" });
    }
  });
});

router.get("/:userId", (req, res, next) => {
  Image.find({userId: req.params.userId}).then(image => {
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ message: "Image not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Image.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Image deleted!" });
  });
});

module.exports = router;
