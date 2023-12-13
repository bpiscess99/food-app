const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// Get food categories
const foodCategory = asyncHandler(async(req, res) => {
    const category = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    res.status(200).json({message: "successfully get category", data: category})
    if(!category){
        res.status(400)
        throw new Error("there is no product category")
    }
});


// Get food data
const foodData = asyncHandler(async(req, res) => {
    const data = await mongoose.connection.db.collection("foodData2").find({}).toArray();
    res.status(200).json({message: "successfully get data", data: data})

    if(!data){
        res.status(400)
        throw new Error("There is no food data")
    }
})


module.exports ={
    foodCategory,
    foodData
}