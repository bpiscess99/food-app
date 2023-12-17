const express = require("express");
const  foodCategory  = require("../controllers/foodController");
const router = express.Router();

// Get food category
router.post("/fooddata", foodCategory)





module.exports = router