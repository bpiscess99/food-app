const passport = require("passport");



// Login With Facebook
const facebookLogin = passport.authenticate("facebook", {
    scope: ["email"],
    session: false, // Set to false if you are not using sessions; otherwise, set up sessions
});

// facebook callback
const facebookCallback = passport.authenticate("facebook", {

  // generate and set a token if authentication succeeds
  failureRedirect: "/login", // redirect to frontend route
  session: false,
})

const handleFacebookSuccess = (req, res) => {
    res.redirect("http://localhost:3000/")
};


module.exports = {
    facebookLogin,
  facebookCallback,
  handleFacebookSuccess
}