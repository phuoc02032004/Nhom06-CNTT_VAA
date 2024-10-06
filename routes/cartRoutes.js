
const express = require('express')
const cartController = require('../controller/cartController');
const router =express.Router();

router.get('/',cartController.getAll)

router.get('/',cartController.getById)

module.exports = router;
