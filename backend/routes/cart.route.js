const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");
const env = require("dotenv");
const {
  isAdmin,
  isEditor,
  isUser,
  isAdminOrEditor,
  isAdminOrUser,
} = require("../validation.js");

env.config();

// Route to get all items in the cart
router.get("/", async (req, res) => {
  const sessionUser = req.session.user|| {_id: "66eac8eb1f04e3e0d2ca9d15", accessLevel:"admin"};
  if (!sessionUser) return res.status(401).json({ success: false, message: "Not logged in" });
  if (!isAdminOrUser(sessionUser)) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const data = await User.find({ _id: sessionUser._id }, "cart");
    const user = data[0];

    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("Error in fetching all items in the cart", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to get a specific users cart by ID
router.get("/:id", async (req, res) => {
  if (!isAdmin(req.session.user))
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const data = await User.find({ _id: req.params.id }, "cart");
    const user = data[0];

    return res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("Error in fetching the users cart by ID", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to add a new item to the cart
router.post("/", async (req, res) => {
  const sessionUser = req.session.user;
  if (!sessionUser) return res.status(401).json({ success: false, message: "Not logged in" });
  if (!isAdminOrUser(sessionUser)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(product._id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const user = await User.findById(sessionUser._id);
    let itemInCart = false;
    user.cart.map((cartItem) => {
      if (
        cartItem._id === product._id &&
        cartItem.size === product.size &&
        cartItem.color === product.color
      ) {
        itemInCart = true;
      }
    });

    if (itemInCart) {
      return res.status(400).json({ success: false, message: "Product already added in cart" });
    }

    user.cart.push(product);
    await user.save();
    return res.status(200).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.log("Error in adding product to cart", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to delete an item from the cart
router.delete("/", async (req, res) => {
  const sessionUser = req.session.user || {_id: "66eac8eb1f04e3e0d2ca9d15", accessLevel:"admin"};
  if (!sessionUser) return res.status(401).json({ success: false, message: "Not logged in" });
  if (!isAdminOrUser(sessionUser)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(product._id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const user = await User.findById(sessionUser._id);
    user.cart = user.cart.filter((cartItem) => !( 
      cartItem._id === product._id && 
      cartItem.size === product.size && 
      cartItem.color === product.color 
    ));

    await user.save();
    return res.status(200).json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.log("Error in removing product from cart", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to update an item in the cart
router.put("/", async (req, res) => {
  const sessionUser = req.session.user;
  if (!sessionUser) return res.status(401).json({ success: false, message: "Not logged in" });
  if (!isAdminOrUser(sessionUser)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(product._id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const user = await User.findById(sessionUser._id);
    user.cart = user.cart.map((cartItem) => {
      if (
        cartItem._id === product._id &&
        cartItem.size === product.size &&
        cartItem.color === product.color
      ) {
        return product;
      }
      return cartItem;
    });
    await user.save();
    return res.status(200).json({ success: true, message: "Product updated in cart" });
  } catch (error) {
    console.log("Error in updating product in cart", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
