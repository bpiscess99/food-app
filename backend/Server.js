const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");


const app = express();

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

// Routes middleware
app.use("/api/users", userRoute)

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Connected to DB and start the server
const Port = process.env.PORT || 5000;
mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
        app.listen(Port, () => {
        console.log(`server is running on ${Port}`)
        })
        }).catch((err) => console.log(err))

                



           
