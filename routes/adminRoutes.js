const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const categoryController = require("../controllers/categoryController");
const productController = require('../controllers/productController');

router.get('/users', adminController.viewUsers); // מסלול לצפייה בכל המשתמשים
router.get('/admin', adminController.renderAdmin); // ודא שהפונקציה קיימת במנהל הקונטרולר

// Route for viewing users
router.get('/admin/users', adminController.viewUsers); 


router.get("/", adminController.renderAdmin);
router.delete('/', adminController.deleteOrder);

router.get("/categories", categoryController.listCategories);
router.post("/categories", categoryController.addCategory);
router.get("/categories/:name", categoryController.listProductsByCategory);
router.put("/categories/:id", categoryController.editCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

router.get('/products', productController.renderProducts);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.editProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
