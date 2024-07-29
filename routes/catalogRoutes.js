const express = require("express");
const router = express.Router();

const catalogController = require("../controllers/catalogController");
const groupByProductController = require('../controllers/groupByProductController');
const averagePriceBySupplierController = require('../controllers/AveragePriceBySupplierController');


// נתיבים לשאילתות קיבוץ
router.get('/products-grouped-by-supplier', groupByProductController.getProductsGroupedBySupplier);
router.get('/products-grouped-by-category', groupByProductController.getProductsGroupedByCategory);
router.get('/catalog/average-price-by-supplier', averagePriceBySupplierController.getAveragePriceBySupplier);


// נתיבים אחרים
router.get("/", catalogController.renderCatalog);
router.get("/:id", catalogController.getProductById);

module.exports = router;
