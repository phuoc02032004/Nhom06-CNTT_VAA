const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const multer = require('multer');

// Cấu hình Multer (sử dụng bộ nhớ RAM cho đơn giản, có thể cấu hình lưu trữ khác nếu cần)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Sử dụng middleware upload cho các routes cần upload file
router.post('/', upload.array('images', 5), productController.createProduct);
router.put('/:id', upload.array('images', 5), productController.updateProduct);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
