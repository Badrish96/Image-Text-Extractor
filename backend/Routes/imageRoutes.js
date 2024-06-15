const express = require("express");
const router = express.Router();
const imageController = require("../Controllers/imageController");
const authMiddleware = require("../Middlewares/authMiddleware");
const multer = require("multer");
const upload = multer();

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  imageController.postImage
);
// router.get("/", authMiddleware, imageController.getImage);

module.exports = (app) => {
  app.use("/api/images", router);
};
