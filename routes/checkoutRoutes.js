const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// נתיב GET להצגת עמוד ה-checkout
router.get('/checkout', checkoutController.getCheckoutPage);

// נתיב POST לטיפול בהזמנה
router.post('/checkout', checkoutController.postOrder);

module.exports = router;
