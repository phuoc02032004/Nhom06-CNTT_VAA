const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controller/reviewController');

router.post('/', reviewController.createReview);
router.get('/', reviewController.getReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);
router.post('/:reviewId/replies', reviewController.addReply);
router.get('/product/:productId', reviewController.getReviewsByProduct);
router.get('/rating/:rating', reviewController.getReviewsByRating);

module.exports = router;