
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

exports.createCart = async (req, res) => {
    try {
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
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
