const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/checkoutPaypal', productController.checkoutPaypal);

module.exports = router;
