const Order = require('../models/Order');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
    try {
        const { orderId, productId } = req.params;
        const order = await Order.findById(orderId).populate('products.product').populate('user'); // Add .populate('user')
        if (!order) throw createError(404, 'Order not found');
        const product = order.products.find(p => p.product._id.equals(productId));
        if (!product) throw createError(400, 'Product not found in order');
        if (product.isReviewed) throw createError(400, 'Product already reviewed');
        req.order = order;
        req.product = product;
        next();
    } catch (error) {
        next(error);
    }
};