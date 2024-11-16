const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({

   item: {
      type: String,
      required: true,
      trim: true,
   },
   quantity: {
      type: Number,
      required: true,
      min:1,
   },
   price: {
      type:Number,
      required: true,
      min: 0,
   },
   size: {
      type: String,
      required: [true, "size", "true" ]
   },
});  // prevent creation of _id for each order item

const orderSchema = mongoose.Schema(
    {
     email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
     },
     order_data: {
        type: [orderItemSchema],
        required: true,
        type: Array,
        default: [],
     },
     order_date: {
      type: Date, // Change the type to Date
      required: true,
      default: Date.now // Set a default value to the current date
   },
   total_amount: {
      type: Number,
      required: true,
      min: 0,
   },
   // payment_status: {
   //    type: String,
   //    enum: ["pending", "completed", "failed"],
   //    default: "pending"
   // },      
   // payment_transaction_id: {
   //    type: String,
   //    default: null, // used for tracking payment transaction
   // },
   // order_status: {
   //    type: String,
   //    enum: ["processing", "shipped", "delivered", "cancelled"],
   //    default: "processing"
   // }
},{
   timestamps: true,
}
);


const Order = mongoose.model("order", orderSchema)
module.exports = Order