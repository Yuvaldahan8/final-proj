const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

<<<<<<< Updated upstream
// נתיב GET להצגת עמוד ה-checkout
router.get('/', checkoutController.getCheckoutPage);

// נתיב POST לטיפול בהזמנה
router.post('/checkout', checkoutController.postOrder);
=======
router.get('/', checkoutController.renderCheckoutPage);

router.post('/', checkoutController.handleFormSubmission);
>>>>>>> Stashed changes

module.exports = router;
