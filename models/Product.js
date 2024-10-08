const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    category: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    weight: {
        type: Number
    },
    dimensions: {
        type: String
    },
    color: {
        type: String
    },
    style: {
        type: String
    },
    origin: {
        type: String
    },
    manufacturer: {
        type: String
    },
    reviews: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;