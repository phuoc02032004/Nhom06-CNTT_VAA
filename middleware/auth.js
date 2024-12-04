const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        console.log('Authorization Header:', authHeader);

        if (!authHeader) {
            console.log('No authorization header found.');
            return res.status(401).json({ message: 'Token xác thực không được tìm thấy' });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token:', token);

        if (!token) {
            console.log('Invalid token format.');
            return res.status(401).json({ message: 'Định dạng token không hợp lệ' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.id);
        console.log('Found user:', user);

        if (!user) {
            console.log('User not found.');
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Lỗi xác thực:", error);
        let message = 'Lỗi xác thực';
        if (error.name === 'TokenExpiredError') {
            message = 'Token đã hết hạn';
        } else if (error.name === 'JsonWebTokenError') {
            message = 'Token không hợp lệ';
        }
        res.status(401).json({ message });
    }
};

module.exports = authMiddleware;