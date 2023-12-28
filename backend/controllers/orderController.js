const Order = require("../model/orderModel");
const asyncHandler = require("express-async-handler");


const orderFood = asyncHandler(async (req, res) => {
    console.log("request Data:", req.body)
   const {order_data, order_date, email} = req.body;

   order_data.splice(0, 0, {order_date: order_date, ...order_data});

//    validation
   if(!email || !order_data || order_date || email === null){
    res.status(400)
    throw new Error("Please provide all required fields")
   }
    
// if email already exist
const existingOrder = await Order.findOne({email}) 

if(existingOrder){
    // if email already exist, update the existing order with new data
    try {
        const order = await Order.findByIdAndUpdate({email},
            {
                $push: {
                    order_data: {Order_date: order_date, ...order_data} 
                
                }
            },
            {new: true} // to return the updated documents
        );
        res.json(order)    
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error:" + error.message)
    }
    
} else{
    // create new order
    const order = await Order.create({
        email,
        order_data
     });
    
       if(order){
        res.status(201).json({
            id : order._id,
            email,
            date: order_date,
            order_data: order.order_data
        })
    }else{
        res.status(400)
        throw new Error("Failed to add the order")
    }
}
 
});


module.exports = orderFood