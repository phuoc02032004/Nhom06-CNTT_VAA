const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.array('images', 5), productController.createProduct);
router.put('/:id', upload.array('images', 5), productController.updateProduct);
router.get('/category/:categoryId', productController.getProductsByCategory); //xem cái tất cả sản phẩm theo cate ở đây nhé mấy cu

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
