const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controller/reviewController');

// Route tạo review
router.post('/', reviewController.createReview);

// Route lấy tất cả reviews (có thể dùng để filter)
router.get('/', reviewController.getReviews);

// Route lấy review theo ID
router.get('/:id', reviewController.getReviewById);

// Route cập nhật review
router.put('/:id', reviewController.updateReview);

// Route xóa review
router.delete('/:id', reviewController.deleteReview);

// Route thêm reply vào review
router.post('/:reviewId/replies', reviewController.addReply);

// Route lấy tất cả reviews của một sản phẩm cụ thể
router.get('/:productId/product', reviewController.getReviewsByProduct);


module.exports = router;