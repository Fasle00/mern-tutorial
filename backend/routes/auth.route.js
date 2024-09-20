const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const session = require('express-session');

const CLIENT_URL = "http://localhost:5000/";

router.get("/login/success", async (req, res) => {
  if (req.user) {
    console.log("req.user: ", req.user);
    console.log(!User.findOne({ googleId: req.user.id }))
    const foundUser = await User.findOne({ googleId: req.user.id });
    console.log("foundUser: ", foundUser)
    if (foundUser === null) {
      const newUser = new User({
        googleId: req.user.id,
        displayName: req.user.displayName,
        email: req.user.emails[0].value,
        photos: req.user.photos[0].value,
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
      req.session.user = user;
      console.log("user: ", user)

      return res.status(200).json({
        success: true,
        message: "User has successfully authenticated",
        user: user,
      });
    }
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed to authenticate",
  });
});

router.get("/logout", (req, res) => {
    req.session.user = null;
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
