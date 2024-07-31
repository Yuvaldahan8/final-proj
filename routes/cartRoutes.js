const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/update', cartController.updateCartItem);
router.post('/remove', cartController.removeCartItem);
router.post('/clear', cartController.clearCart);
router.post('/add', cartController.addToCart); 


module.exports = router;
