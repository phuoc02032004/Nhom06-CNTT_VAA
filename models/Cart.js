const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    cart_id:{
        type:'string'
    },
    product_id:{
        type:'string'
    },
    price:{
        type:'number'
    },
    quantity:{
        type:'number'
    },
    user_id:{
        type:'string'
    }
});
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;