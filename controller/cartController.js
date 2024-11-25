const cartService = require('../services/cartService');

exports.getAll = async (req, res) => {
    try {
        const carts = await cartService.getAllCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const cart = await cartService.getCartById(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.getCartByUserId = async (req, res) => {
    try {
        const cart = await cartService.getCartByUserId(req.params.userId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.createCart = async (req, res) => {
    try {
        const savedCart = await cartService.createOrUpdateCart(req.body.user, req.body.products);
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const updatedCart = await cartService.updateCartProductQuantity(req.params.id, req.body.productId, req.body.quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.deleteProductFromCart = async (req, res) => {
    try {
        const updatedCart = await cartService.deleteProductFromCart(req.params.cartId, req.params._id);
        res.status(200).json({ message: 'Product removed from cart', cart: updatedCart });
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};