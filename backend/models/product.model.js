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
    description: {
        type: String,
        required: true
    },
    imageRed: {
        type: String,
        required: true
    },
    imageBlue: {
        type: String,
        required: true
    },
    imageGreen: {
        type: String,
        required: true
    },
    imageYellow: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports =  Product;