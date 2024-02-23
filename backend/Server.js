const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const foodRoute = require("./routes/foodRoute");
const orderRoute = require("./routes/orderRoute");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cookieParser())


// Routes middleware
app.use("/api/users", userRoute)
app.use("/api/foods", foodRoute)
app.use("/api/orders", orderRoute)

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

                console.log(`server is running on ${Port} and db connected`)
            })
        }).catch((err) => console.log(err))

                


           
