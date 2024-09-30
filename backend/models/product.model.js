const mongoose = require( "mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sizes: {
        type: Array,
        default: []
    },
    colors: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports =  Product;