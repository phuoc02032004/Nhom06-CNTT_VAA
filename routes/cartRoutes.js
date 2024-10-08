

const express = require('express')
const cartController = require('../controller/cartController');
const router =express.Router();

router.get('/',cartController.getAll)

router.get('/getBy',cartController.getById)

router.get('/get_by_user',cartController.getCartByUserId)

router.post('/',cartController.createCart)

router.put('/', cartController.updateCart)

router.delete('/',cartController.deleteCart)

//router.get('/get_by_user',cartController.getByUserId)

module.exports = router;


