const express = require("express");
const {stripeIntegration} = require("../controllers/stripeController");
const router = express.Router();


router.post("/create-checkout-session", stripeIntegration )


module.exports = router;