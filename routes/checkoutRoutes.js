const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// נתיב GET להצגת עמוד ה-checkout
router.get('/', checkoutController.getCheckoutPage);

// נתיב POST לטיפול בהזמנה
router.post('/', checkoutController.postOrder);

module.exports = router;
