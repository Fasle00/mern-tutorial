const passport = require( 'passport');
const GoogleStrategy = require( "passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
dotenv.config();

const RENDER_URL = "https://mern-tutorial-yzc5.onrender.com/auth/google/callback";
const DEV_URL = "http://localhost:5000/auth/google/callback";

// Passport configuration for Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: DEV_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
