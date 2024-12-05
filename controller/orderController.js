const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
    try {
        const savedOrder = await orderService.createOrder(req.body);
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        await orderService.deleteOrder(req.params.id);
        res.status(200).json({ message: 'Đơn hàng đã được xoá' });
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    try {
        const user = req.params.user;
        const orders = await orderService.getOrdersByUserId(user);
        res.status(200).json(orders);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};