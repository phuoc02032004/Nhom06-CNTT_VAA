const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/auth');

// User routes
router.post('/register', userController.register);
router.post('/verify', userController.verifyEmail);
router.post('/login', userController.login);

router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.get('/:id', userController.get);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

router.use(authMiddleware);


module.exports = router;