const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.get('/user/:userId', orderController.getOrdersByUserId);

module.exports = router;