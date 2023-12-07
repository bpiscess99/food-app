const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})
const Port = process.env.PORT || 5000;

mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(Port, () => {
                console.log(`server is running on ${Port}`)
            })
        })

           
