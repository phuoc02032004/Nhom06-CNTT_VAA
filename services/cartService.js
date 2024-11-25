const Cart = require('../models/Cart');

exports.getAllCarts = async () => {
    const carts = await Cart.find().populate('products.product');
    if (carts.length === 0) throw new Error("No carts found");

    const formattedCarts = carts.map(cart => ({
        ...cart.toObject(),
        products: cart.products.map(productItem => {
            if (productItem.product) {
                return {
                    ...productItem.product.toObject(),
                    quantity: productItem.quantity
                };
            } else {
                return {
                    product: productItem._id,
                    quantity: productItem.quantity
                };
            }
        })
    }));
    return formattedCarts;
};

exports.getCartById = async (cartId) => {
    if (!cartId) throw new Error("cartId is required");
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Cart not found");
    return cart;
};

exports.getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    if (!cart) throw new Error("Cart not found for this user.");
    return cart;
};

exports.createOrUpdateCart = async (userId, products) => {
    let existingCart = await Cart.findOne({ user: userId });

    if (existingCart) {
        products.forEach(item => {
            const existingProduct = existingCart.products.find(p => p.product.toString() === item.product);
            if (existingProduct) {
                existingProduct.quantity += item.quantity;
            } else {
                existingCart.products.push(item);
            }
        });
        return await existingCart.save();
    } else {
        const newCart = new Cart({ user: userId, products });
        return await newCart.save();
    }
};


exports.updateCartProductQuantity = async (cartId, productId, quantity) => {
    const updatedCart = await Cart.findOneAndUpdate(
        { _id: cartId, "products.product": productId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
    );
    if (!updatedCart) throw new Error("Cart or product not found");
    return updatedCart;
};


exports.deleteProductFromCart = async (cartId, productId) => {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Cart not found');
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex === -1) throw new Error('Product not found in cart');
    cart.products.splice(productIndex, 1);
    return await cart.save();
};