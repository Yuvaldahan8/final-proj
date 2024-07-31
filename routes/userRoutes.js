const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const userStatsController = require("../controllers/userStatsController");



// Render edit user page
router.get("/edit-user", userController.renderEditUser);

// Handle edit user form submission
router.post("/edit-user", userController.updateUser);



router.get("/", userController.renderLogin);
router.get("/home", userController.renderHome);
router.get("/login", userController.renderLogin);
router.get("/signup", userController.renderSignup);
router.get("/logout", userController.logout);

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/cart", productController.viewCart);
router.post("/cart", productController.addToCart);
router.post("/cart/clear", productController.clearCart); 
router.get("/user-counts-by-role", userStatsController.getUserCountsByRole);

router.get("/cartPaypal", productController.viewPayPalCart); // מחזיר את עמוד עגלת הקניות
router.post("/cartPayPal", productController.addProduct); // מוסיף מוצר לעגלה באמצעות AJAX
router.post("/cart/clear", productController.clearPayPalCart); // מנקה את העגלה
router.post("/checkout", productController.checkoutPaypal); // התחלת תהליך התשלום
router.get("/checkout/success", productController.renderCheckoutSuccess); // עמוד הצלחה לאחר תשלום
router.get("/checkout/cancel", productController.renderCheckoutCancel); // עמוד ביטול תשלום



module.exports = router;

