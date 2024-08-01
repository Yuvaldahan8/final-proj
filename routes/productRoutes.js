const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// הגדרת נתיבי המוצרים
router.get('/', productController.listProducts);
router.get('/products', productController.renderProducts);
router.post('/add', productController.addProduct);
router.put('/edit/:id', productController.editProduct);
router.delete('/delete/:id', productController.deleteProduct);

router.post('/cart/add', productController.addToCart);
router.get('/cart', productController.viewCart);
router.post('/cart/clear', productController.clearCart);

module.exports = router;
