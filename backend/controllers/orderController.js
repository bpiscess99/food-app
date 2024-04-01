const Order = require("../model/orderModel");
const asyncHandler = require("express-async-handler");


const orderFood = asyncHandler(async (req, res) => {
try {
   let data = req.body
   data.unshift({ OrderDate: req.body }); // Add Order_date at the beginning

   const updatedOrder = await Order.findOneAndUpdate(
       { email: req.body.email },
       { $push: { products: data } },
       { upsert: true, new: true }
   );

   res.json({ success: true, order: updatedOrder });
} catch (error) {
   console.error(error.message);
   res.status(500).send("Server Error: " + error.message);
}
});


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