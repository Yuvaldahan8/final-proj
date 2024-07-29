const express = require("express");
const router = express.Router();

const catalogController = require("../controllers/catalogController");
const groupByProductController = require('../controllers/groupByProductController');

// נתיבים לשאילתות קיבוץ
router.get('/products-grouped-by-supplier', groupByProductController.getProductsGroupedBySupplier);
router.get('/products-grouped-by-category', groupByProductController.getProductsGroupedByCategory);

// נתיבים אחרים
router.get("/", catalogController.renderCatalog);
router.get("/:id", catalogController.getProductById);

module.exports = router;
