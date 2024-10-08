const mongoose = require('mongoose')
const formattedDate = () => new Date().toLocaleString('en-GB', { hour12: false });

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    createdAt: {
        type: String,
        default: formattedDate, // DD/MM/YYYY HH:mm:ss
    },
    updatedAt: {
        type: String,
        default: formattedDate,
    }
})
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;