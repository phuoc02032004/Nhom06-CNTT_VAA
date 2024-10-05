const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/auth');

// User routes
router.post('/register', userController.register);
router.post('/verify', userController.verifyEmail); // Sử dụng verify thay cho verify-email
router.post('/login', userController.login);

// Áp dụng middleware xác thực cho các route bên dưới
router.use(authMiddleware);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.get('/:id', userController.get);

module.exports = router;