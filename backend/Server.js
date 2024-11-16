const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");

// import routes
const userRoute = require("./routes/userRoute");
const foodRoute = require("./routes/foodRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
const chatRoute = require("./routes/chatRoute");
// Passport routes 
const facebookRoute = require("./routes/facebookRoute");
const passport = require("./middleWares/passportConfig")

// Initialize Express and HTTP Server
const app = express();
const server = http.createServer(app); // websocket middleware
app.use(passport.initialize());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    method: ["GET", "POST"],
  })
);

// Set up Socket.io with CORS for WebSocket communication
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// Routes middleware
app.use("/api/users", userRoute);
app.use("/api/foods", foodRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/chats", chatRoute);
app.use('/api/auth', facebookRoute)

// Basic Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// socket.io connection handler
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen custom events (e.g., order updates)
  socket.on("chatMessage", (data) => {
    // check if data  and data.message are defined
    if(data && data.message){
    const userMessage = data.message;
    let reply = "I am here to help!"

    if(userMessage.includes("order")){
        reply = "Your order is being prepared!";
    }else if(userMessage.includes("delivery")){
        reply = 'Your delivery is on its way'
    }else if(userMessage.includes("when i can get my order"))
        reply = `soon you will get it`
      // Send the automatic reply back to the client
    io.emit("chatMessage", {message: reply});
}else{
    console.error("Invalid data received: Message is undefined")
}
});

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});


// Connected to DB and start the server
const Port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(Port, () => {
      console.log(`server is running on ${Port} and db connected`);
    });
  })
  .catch((err) => console.log(err));
