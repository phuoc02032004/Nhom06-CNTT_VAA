const express = require('express');
const cartController = require('../controller/cartController');
const router = express.Router();

router.get('/', cartController.getAll);

router.get('/:id', cartController.getById);

router.get('/user/:userId', cartController.getCartByUserId); // Thay đổi route thành /user/:userId

router.post('/', cartController.createCart);

router.put('/:id', cartController.updateCart); // Sử dụng ID cho route update

router.delete('/:id', cartController.deleteCart); // Sử dụng ID cho route delete

module.exports = router;