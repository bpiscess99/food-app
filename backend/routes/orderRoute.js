const express = require("express");
const { myOrderFood, orderFood} = require("../controllers/orderController");
const router = express.Router();

router.post("/foodData", orderFood)
router.get("/myOrder", myOrderFood)


module.exports = router;