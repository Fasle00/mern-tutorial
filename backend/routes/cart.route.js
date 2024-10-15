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
  if (!isAdminOrUser(req.session.user)) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const data = await User.find({ _id: req.session.user._id}, "cart");
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

    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("Error in fetching the users cart by ID", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to add a new item to the cart
router.post("/", async (req, res) => {
  if (!isAdminOrUser(req.session.user)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(product._id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    const user = await User.findById(req.session.user._id);
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
      return res
        .status(400)
        .json({ success: false, message: "Product already added in cart" });
    }
    user.cart.push(product);
    await user.save();
    res.status(200).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.log("Error in adding product to cart", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to delete an item from the cart
router.delete("/", async (req, res) => {
  if (!isAdminOrUser(req.session.user)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const product = req.body;
  console.log("product: ", req.body);
  if (!mongoose.Types.ObjectId.isValid(product._id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    const user = await User.findById(req.session.user._id);
    console.log("user: ", user.cart);
    let newCart = [];
    user.cart.map((cartItem) => {
      if (
        !(cartItem._id === product._id &&
        cartItem.size === product.size &&
        cartItem.color === product.color)
      ) {
        newCart.push(cartItem);
      }
    });
    console.log("newCart: ", newCart);
    user.cart = newCart;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.log("Error in removing product from cart", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to update an item in the cart
router.put("/", async (req, res) => {
  if (!isAdminOrUser(req.session.user)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(product._id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    const user = await User.findById(req.session.user._id);
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
    return res
      .status(200)
      .json({ success: true, message: "Product updated in cart" });
  } catch (error) {
    console.log("Error in updating product in cart", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
