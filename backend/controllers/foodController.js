const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");


// Get food categories
const foodCategory = asyncHandler(async(req, res) => {
    const category = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    const foodData = await mongoose.connection.db.collection("foodData2").find({}).toArray();
    
    if(!category || !foodData){
        res.status(400)
        throw new Error("there is no product category")
    }

    res.status(200).json({
        category,
        foodData
    })

});


module.exports = foodCategory



