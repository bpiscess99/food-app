const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
     email: {
        type: String,
        required: true,
        trim: true
     },
     order_data: {
        type: Array,
        default: [],
     },
     order_date: {
      type: Date, // Change the type to Date
      required: true,
      default: Date.now // Set a default value to the current date
   }      
})


const Order = mongoose.model("order", orderSchema)
module.exports = Order