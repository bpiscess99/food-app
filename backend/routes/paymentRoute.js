const express = require("express");
const {stripeIntegration, saveOrder} = require("../controllers/stripeController");
const router = express.Router();


router.post("/create-checkout-session", stripeIntegration )
router.post("/saveOrder", saveOrder)


module.exports = router;