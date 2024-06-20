const express = require("express");
//יוצר אובייקט Router, שמאפשר להגדיר נתיבים נפרדים הניתנים לניהול וארגון בצורה נוחה.
const router = express.Router();
//מייבא את הקונטרולר userController, שמכיל את הלוגיקה לטיפול בבקשות הקשורות למשתמשים
const userController = require("../controllers/userController");

// Login routes
router.get("/", userController.renderLogin);
router.get("/login", userController.renderLogin);
router.post("/login", userController.login);

module.exports = router;
