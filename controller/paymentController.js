const crypto = require('crypto');

const vnpay_url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
const vnp_TmnCode = '6COEHFGZ';
const vnp_HashSecret = 'K70US4L4TQ0HVCIPEQ7KD7J3T1C1B7V6';
const vnp_ReturnUrl = 'https://sandbox.vnpayment.vn/paymentv2/Payment/Error.html?code=03';

function createVnpayData(data) {
    const { amount, orderInfo, orderType } = data;
    const vnp_TxnRef = Date.now().toString();
    const vnp_Amount = amount * 100;
    const vnp_OrderInfo = orderInfo;
    const vnp_OrderType = orderType;

    const vnpayData = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode,
        vnp_Amount,
        vnp_TxnRef,
        vnp_OrderInfo,
        vnp_OrderType,
        vnp_Locale: 'vn',
        vnp_ReturnUrl,
    };

    return vnpayData;
}

function calculateChecksum(data) {
    const dataString = Object.keys(data)
        .sort()
        .map((key) => `${key}=${data[key]}`)
        .join('&');

    return crypto
        .createHmac('sha256', vnp_HashSecret)
        .update(dataString)
        .digest('hex');
}

async function createPaymentUrl(req, res) {
    const { amount, orderInfo, orderType } = req.body;
    const vnpayData = createVnpayData({ amount, orderInfo, orderType });
    vnpayData.vnp_SecureHash = calculateChecksum(vnpayData);
    res.json({
        url: `${vnpay_url}?${new URLSearchParams(vnpayData)}`,
    });
}

module.exports = {
    createPaymentUrl,
};