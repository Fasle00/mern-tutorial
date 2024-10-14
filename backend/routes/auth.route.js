const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");

const CLIENT_URL = "http://localhost:5000/";
const RENDER_URL = "https://mern-tutorial-yzc5.onrender.com/";

// Callback route for a successful login 
router.get("/login/success", async (req, res) => {
  if (req.user) {
    const foundUser = await User.findOne({ googleId: req.user.id });

    if (foundUser === null) {
      const newUser = new User({
        googleId: req.user.id,
        displayName: req.user.displayName,
        email: req.user.emails[0].value,
        image: req.user.photos[0].value,
      });

      try {
        await newUser.save();
        return res.status(200).json({
          success: true,
          message: "User has successfully authenticated",
          user: req.user,
        });
      } catch (error) {
        console.error(`Error in create product, error: ${error}`);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    } else {
      const user = await User.findOne({ googleId: req.user.id });
      req.session.user = user;;

      return res.status(200).json({
        success: true,
        message: "User has successfully authenticated",
        user: user,
      });
    }
  }
});

// Route to handle a failed login
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed to authenticate",
  });
});

// Route to logout
router.get("/logout", (req, res) => {
  req.session.user = null;
  req.logout();
  res.redirect(RENDER_URL);
});

// Route to authenticate with Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route for Google to redirect to
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: RENDER_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
