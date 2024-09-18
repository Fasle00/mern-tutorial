const passport = require( 'passport');
const GoogleStrategy = require( "passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        /* const user = {
            username: profile.displayName,
            email: profile.emails[0],
            avatar: profile.photos[0]
        } */

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

// https://www.youtube.com/watch?v=7K9kDrtc4S8 tid: 50:00