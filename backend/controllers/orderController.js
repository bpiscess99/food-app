const Order = require("../model/orderModel");
const asyncHandler = require("express-async-handler");


const orderFood = asyncHandler(async (req, res) => {
   const {order_data, order_date, email} = req.body;

//    validation
   if(!email || !order_data || order_date){
    res.status(400)
    throw new Error("Please provide all required fields")
   }
    
})


module.exports = orderFood
