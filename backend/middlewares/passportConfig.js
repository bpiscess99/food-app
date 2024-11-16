// facebook login middleware 
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


//  Facebook middleware
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret:process.env.FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:5000/api/auth/facebook/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // here we can find and create a user in the database
            console.log("Facebook Profile:", profile);
            return done(null, profile);
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;