
const Cart = require('../models/Cart');

exports.getAll = async (req, res) => {
    try {
        const data = await Cart.find()
        if (data) {
            res.status(200).json(data);
        } else {
            console.log("cannot find items")
        }
    } catch {
        res.status(500).json({ error: error.message });
    }
}

exports.getById = async (req, res) => {
    const cartId = req.query.id;
    if (!cartId) {
        res.status(404).json("cannot find item");
    }
    try {
        const data = await Cart.findById(cartId);
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json("cannot find item");
        }
    } catch {
        res.status(500);
    }
}

exports.getCartByUserId = async (req, res) => {
    const userId = req.query.id; // Lấy userId từ query params

    try {
        const cart = await Cart.find({ user: userId }).populate('products.product'); // Tìm giỏ hàng theo userId và kết nối với sản phẩm

        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user." });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const Product = require('../models/Product')

exports.createCart = async (req, res) => {
    const userId = req.body.user;
    const products = req.body.products;
    try {
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
            const updatedCart = await existingCart.save();
            return res.status(200).json(updatedCart);
        } else {
            // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng
            const newCart = new Cart(req.body);
            const savedCart = await newCart.save();
            return res.status(201).json(savedCart);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateCart = async (req, res) => {
    const cartId = req.query.id;
    try {
        const updatedCart = await Cart.findByIdAndUpdate(cartId, req.body, { new: true });
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteCart = async (req, res) => {
    const cartId = req.query.id
    if (!cartId) {
        res.status(404).json("cannot find item");
    }
    try {
        const deletedCart = await Cart.findByIdAndDelete(cartId);
        res.status(200).json({ message: 'Delete success' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
