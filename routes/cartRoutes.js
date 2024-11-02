const express = require('express');
const cartController = require('../controller/cartController');
const router = express.Router();

router.get('/', cartController.getAll);

router.get('/:id', cartController.getById);

router.get('/user/:userId', cartController.getCartByUserId);

router.post('/', cartController.createCart);

router.put('/:id', cartController.updateCart);

router.delete('/:id', cartController.deleteCart); 

module.exports = router;