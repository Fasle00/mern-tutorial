const express = require("express");
//const { createProduct, deleteProduct, getProducts, updateProduct } = require( '../controllers/product.controller.js');
const Product = require("../models/product.model.js");
const mongoose = require("mongoose");
const session = require("express-session");
const { isAdmin, isEditor, isAdminOrEditor } = require("../validation.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.post("/", async (req, res) => {
  if (isAdminOrEditor(req.session.user)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error in create product, error: ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.put("/:productId", async (req, res) => {
  console.log("update req");
  console.log("req.session.user: ", req.session.user);

  if (isAdminOrEditor(req.session.user)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { productId } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: true, message: "Server error" });
  }
});

router.delete("/:productId", async (req, res) => {
  if (isAdminOrEditor(req.session.user)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { productId } = req.params;

  // check if the product id is valid
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleting product: ", error.message);
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
});

module.exports = router;
