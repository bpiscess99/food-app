const express = require("express");
const { foodCategory, foodData } = require("../controllers/foodController");
const router = express.Router();

// Get food category
router.get("/foodcategory", foodCategory)
router.get("/fooddata", foodData)




module.exports = router