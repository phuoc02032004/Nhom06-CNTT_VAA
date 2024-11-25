const Order = require('../models/Order');

exports.createOrder = async (orderData) => {
    const newOrder = new Order(orderData);
    return await newOrder.save();
};

exports.getAllOrders = async () => {
    return await Order.find();
};

exports.getOrderById = async (id) => {
    const order = await Order.findById(id);
    if (!order) throw new Error('Đơn hàng không tồn tại');
    return order;
};

exports.updateOrder = async (id, orderData) => {
    const updatedOrder = await Order.findByIdAndUpdate(id, orderData, { new: true });
    if (!updatedOrder) throw new Error('Đơn hàng không tồn tại');
    return updatedOrder;
};

exports.deleteOrder = async (id) => {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) throw new Error('Đơn hàng không tồn tại');
    return deletedOrder;
};