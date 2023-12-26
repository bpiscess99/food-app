const express = require("express");
const foodCategory = require("../controllers/foodController");


const router = express.Router();


router.post("/fooddata", foodCategory)










module.exports = router