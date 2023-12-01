const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    discountedPrice: {
        type: Number,
    },
    inventory: {
        type: Number,
        required: true,
    },
},{timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
