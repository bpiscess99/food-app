const express = require("express");
const { facebookLogin, facebookCallback, handleFacebookSuccess } = require("../controllers/facbookController");
const router = express.Router();


router.get("/facebook", facebookLogin)
router.get("/facebook/callback", facebookCallback,handleFacebookSuccess)

module.exports = router;