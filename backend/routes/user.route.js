const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");
const session = require("express-session");
const env = require("dotenv");
const cartRoutes = require("./cart.route.js");
env.config();
const {
  isAdmin,
  isEditor,
  isAdminOrEditor,
  isUser,
} = require("../validation.js");

const adminId = "66eac8eb1f04e3e0d2ca9d15";

router.use("/cart", cartRoutes);

router.get("/", async (req, res) => {
  if (!isAdmin(req.session.user))
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("error in fetching users", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  if (!req.session.user) return res.status(401).json({ success: false, message: "no session user" });
  if (!(req.params.id === req.session.user._id || isAdmin(req.session.user))) return res.status(401).json({ success: false, message: "wrong user" });
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ success: false, message: "User not found" });
  }
  
  try {
    const user = await User.findById(req.params.id);
    if (!req.params.id === user._id) {
      if (!isAdmin(req.session.user))
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("error in fetching user", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
