const express = require("express");
const { registerUser, loginUser, loginWithGoogle } = require("../controllers/userController");
const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/google/callback", loginWithGoogle)


module.exports = router