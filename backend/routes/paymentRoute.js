const express = require("express");
const {stripeIntegration, handleStripeWebhook} = require("../controllers/stripeController");
const router = express.Router();


router.post("/stripe", stripeIntegration)
router.post("/webhook", express.raw({type: "application/json"}), handleStripeWebhook)
// // router.post("/saveOrder", saveOrder)
// router.post("/place-order", placeOrder)
// router.post("/save-order", myOrderFood)


module.exports = router;