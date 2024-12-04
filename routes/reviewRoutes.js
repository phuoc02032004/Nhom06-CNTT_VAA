const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controller/reviewController');
const { body } = require('express-validator');

router.post(
    '/',
    [
        body('rating').notEmpty().isNumeric().withMessage('Rating is required and must be a number'),
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
        body('comment').notEmpty().withMessage('Comment is required'),
    ],
    reviewController.createReview
);

router.get('/', reviewController.getReviews);
router.get('/:id', reviewController.getReviewById);

router.put(
    '/:id',
    [
        body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
        body('comment').optional(),
    ],
    reviewController.updateReview
);

router.delete('/:id', reviewController.deleteReview);

router.post(
    '/:reviewId/replies',
    [body('content').notEmpty().withMessage('Reply content is required')],
    reviewController.addReply
);

router.get('/product/:productId', reviewController.getReviewsByProduct);// xem các đánh giá của một sản phẩm
router.get('/rating/:rating', reviewController.getReviewsByRating); //lấy tất cả các đánh giá có cùng một mức sao
router.get('/count/:rating', reviewController.getReviewCountByRating); // tổng số mỗi sao đánh giá
router.get('/counts', reviewController.getAllReviewCounts);

module.exports = router;