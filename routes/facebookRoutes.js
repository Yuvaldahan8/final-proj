const express = require("express");
const router = express.Router();

const facebookController = require("../controllers/facebookController");

router.get("/", facebookController.renderFacebook);

module.exports = router;
