const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Login routes
router.get("/", userController.renderLogin);
router.get("/login", userController.renderLogin);
router.post("/login", userController.login);

module.exports = router;
