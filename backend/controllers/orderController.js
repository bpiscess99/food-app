const Order = require("../model/orderModel");
const asyncHandler = require("express-async-handler");

// order saved in database
const orderFood = asyncHandler(async (req, res) => {
try {
   let data = req.body.order_data;
   data.unshift({ order_date: req.body.order_date }); // Add Order_date at the beginning

   const updatedOrder = await Order.findOneAndUpdate(
       { email: req.body.email },
       { $push: { order_data: data } },
       { upsert: true, new: true }
   );

   res.json({ success: true, order: updatedOrder });
} catch (error) {
   console.error(error.message);
   res.status(500).send("Server Error: " + error.message);
}
});


// get placed order from database
const myOrderFood = asyncHandler(async(req, res) => {
    const {email} = req.body;
    const orderData = await Order.findOne({email})

    if(!orderData){ 
      res.status(400)
      throw new Error("No Order found")
    }else{
      res.json({orderData, message: "Order Data received"})
    }
});



module.exports = {
   orderFood,
   myOrderFood
}