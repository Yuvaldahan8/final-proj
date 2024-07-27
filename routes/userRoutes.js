const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const productController = require("../controllers/productController");

router.get("/", userController.renderLogin);
router.get("/home", userController.renderHome);
router.get("/login", userController.renderLogin);
router.get("/signup", userController.renderSignup);
router.get("/logout", userController.logout);

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/cart", productController.viewCart);
router.post("/cart", productController.addToCart);

router.get("/about", userController.renderAbout);

module.exports = router;
