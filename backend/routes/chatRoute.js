const express = require("express");
const getAIResponse = require("../controllers/chatController");
const router = express();


router.post("/ai-chat", getAIResponse);


module.exports = router;