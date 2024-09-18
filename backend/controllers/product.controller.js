const Product = require( '../models/product.model.js');
const mongoose = require( 'mongoose');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in fetching products", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = getProducts;

const createProduct = async (req, res) => {
    const product = req.body;


    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        return res.status(201).json({ success: true, data: newProduct, });
    } catch (error) {
        console.error(`Error in create product, error: ${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = createProduct;

const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: true, message: "Server error" });
    }
}

module.exports = updateProduct;

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true,  message: "Product deleted" });
    } catch (error) {
        console.log("Error in deleting product: ", error.message)
        return res.status(404).json({ success: false, message: "Product not found" });
    }

}

module.exports = deleteProduct;