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
        required: true,
     }     
})


const Order = mongoose.model("order", orderSchema)
module.exports = Order