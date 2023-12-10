const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/userController");
const protect = require("../middleWares/authMiddleware");
const router = express.Router();




router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/getuser", protect, getUser)




module.exports = router