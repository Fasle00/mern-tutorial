const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const mongoose = require("mongoose");
const env = require("dotenv");
const cartRoutes = require("./cart.route.js");
const {
  isAdmin,
  isEditor,
  isUser,
  isAdminOrEditor,
  isAdminOrUser,
} = require("../validation.js");

env.config();

// ALl cart routes that are in cart.route.js
router.use("/cart", cartRoutes);

// Route to get all users
router.get("/", async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const users = await User.find({});
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error in fetching all users", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to update a existing user
router.put("/:id", async (req, res) => {
  if (!isAdmin(req.session.user)) {
    if (!req.session.user) return res.status(401).json({ success: false, message: "Not logged in" });
    
    if (req.params.id === req.session.user._id) return res.status(401).json({ success: false, message: "wrong user" });
  }

  // get the user id from the request
  const id = req.params.id;

  const user = req.body;

  // check if the user id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.log("error in updating user", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to delete a existing user
router.delete("/:id", async (req, res) => {
  if (!isAdmin(req.session.user)) {
    if (!req.session.user) return res.status(401).json({ success: false, message: "Not logged in" });
    
    if (req.params.id === req.session.user._id) return res.status(401).json({ success: false, message: "wrong user" });
  }

  // get the user id from the request
  const id = req.params.id;

  // check if the user id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.log("error in deleting user", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to get a specific user by it's ID
router.get("/:id", async (req, res) => {
  if (!isAdmin(req.session.user)) {
    if (!req.session.user) return res.status(401).json({ success: false, message: "Not logged in" });
    
    if (req.params.id === req.session.user._id) return res.status(401).json({ success: false, message: "Wrong user" });
  }

  // get the user id from the request
  const id = req.params.id;

  // check if the user id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    const user = await User.findById(id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("error in fetching user", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
