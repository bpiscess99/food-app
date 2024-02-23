const express = require("express");
const {orderFood, myOrderFood} = require("../controllers/orderController");
const router = express.Router();

router.post("/foodData", orderFood)
router.post("/myOrder", myOrderFood)

module.exports = router