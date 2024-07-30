const express = require("express");
const router = express.Router();

const catalogController = require("../controllers/catalogController");




// נתיבים אחרים
router.get("/", catalogController.renderCatalog);
router.get("/:id", catalogController.getProductById);

module.exports = router;
