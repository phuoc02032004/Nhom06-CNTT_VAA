const Cart = require('../models/Cart');

// Tạo giỏ hàng mới
exports.createCart = async (req, res) => {
    try {
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy danh sách giỏ hàng
exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy giỏ hàng theo ID
exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật giỏ hàng theo ID
exports.updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xoá giỏ hàng theo ID
exports.deleteCart = async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedCart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }
        res.status(200).json({ message: 'Giỏ hàng đã được xoá' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};