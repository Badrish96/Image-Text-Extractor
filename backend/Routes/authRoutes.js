const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = (app) => {
  app.use("/api/auth", router);
};
