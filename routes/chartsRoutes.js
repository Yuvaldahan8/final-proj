const express = require('express');
const router = express.Router();


const groupByProductController = require('../controllers/groupByProductController');
const averagePriceBySupplierController = require('../controllers/AveragePriceBySupplierController');
const userStatsController = require('../controllers/userStatsController');


router.get('/productsGroupedBySupplier', groupByProductController.getProductsGroupedBySupplier);
router.get('/productsGroupedByCategory', groupByProductController.getProductsGroupedByCategory);
router.get('/averagePriceBySupplier', averagePriceBySupplierController.getAveragePriceBySupplier);
router.get('/userCountsByRole', userStatsController.getUserCountsByRole);

module.exports = router;
