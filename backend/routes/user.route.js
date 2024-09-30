const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const session = require("express-session");
const { isAdmin, isEditor, isAdminOrEditor, isUser } = require("../validation.js")

router.get("/", async (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("error in fetching users", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/cart", async (req, res) => {
  if (!isUser(req)) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const data = await User.find({'_id': req.session.user._id}, "cart");
    // it is needed to first convert the user object to string and then parse it to get the cart object
    // otherwise cart is not accessible from the user object
    const userString = JSON.stringify(data[0]);
    const user = JSON.parse(userString);
   
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("error in fetching users", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}); 

router.post("/cart", async (req, res) => {
  if (!isUser(req)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { productId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const user = await User.findById(req.session.user._id);
    user.cart.push(productId);
    await user.save();
    res.status(200).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.log("error in adding product to cart", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;