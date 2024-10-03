const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.use(authMiddleware);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.get('/:id', userController.get);
router.post('/', uploadMiddleware.array('images'), productController.createProduct);

module.exports = router;