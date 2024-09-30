const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");
const session = require("express-session");
const { isAdmin, isEditor, isAdminOrEditor, isUser } = require("../validation.js")

const adminId = "66eac8eb1f04e3e0d2ca9d15";

router.get("/", async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("error in fetching users", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/cart", async (req, res) => {
  if (!isUser(req.session.user)) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const data = await User.find({'_id': req.session.user._id}, "cart");
    const user = data[0];
   
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("error in fetching users", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}); 

router.post("/cart", async (req, res) => {
  if (!isUser(req.session.user)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(product._id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const user = await User.findById(req.session.user._id);
    let itemInCart = false;
    user.cart.map((cartItem) => {
      if (cartItem._id === product._id && cartItem.size === product.size && cartItem.color === product.color) {
        itemInCart = true;
      }
    });
    if (itemInCart) {
      return res.status(400).json({ success: false, message: "Product already in cart" });
    }
    user.cart.push(product);
    await user.save();
    res.status(200).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.log("error in adding product to cart", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/cart", async (req, res) => {
  if (!isUser(req.session.user)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(product._id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const user = await User.findById(req.session.user._id);
    user.cart = user.cart.filter((cartItem) => cartItem._id !== product._id && cartItem.size !== product.size && cartItem.color !== product.color);
    await user.save();
    res.status(200).json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.log("error in removing product from cart", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/cart", async (req, res) => {
  if (!isUser(req.session.user)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(product._id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const user = await User.findById(req.session.user._id);
    user.cart = user.cart.map((cartItem) => {
      if (cartItem._id === product._id && cartItem.size === product.size && cartItem.color === product.color) {
        return product;
      }
      return cartItem;
    });
    await user.save();
    return res.status(200).json({ success: true, message: "Product updated in cart" });
  } catch (error) {
    console.log("error in updating product in cart", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;