const express = require("express");
const router = express.Router();

const supplierController = require("../controllers/supplierController");
const productController = require('../controllers/productController');

router.get("/", supplierController.renderSupplier);

router.get('/products', productController.renderProducts);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.editProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
