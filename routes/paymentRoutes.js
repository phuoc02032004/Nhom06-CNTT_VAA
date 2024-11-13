const express = require('express');
const router = express.Router();
const vnpayController = require('../controller/paymentController');

router.post('/vnpay', vnpayController.createPaymentUrl);

module.exports = router;