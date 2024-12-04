const ReviewService = require('../services/reviewService');
const { validationResult } = require('express-validator');

class ReviewController {
    async createReview(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newReview = await ReviewService.createReview(req.params.productId, req.user._id, req.body);
            res.status(201).json(newReview);
        } catch (error) {
            if (error.statusCode === 400 || error.statusCode === 403 || error.statusCode === 404) {
                next(error);
            } else {
                console.error("Error creating review:", error);
                next(error);
            }
        }
    }

    async getReviews(req, res, next) {
        try {
            const reviews = await ReviewService.getReviews(req.query);
            res.json(reviews);
        } catch (error) {
            console.error("Error getting reviews:", error);
            next(error);
        }
    }

    async getReviewById(req, res, next) {
        try {
            const review = await ReviewService.getReviewById(req.params.id);
            if (!review) {
                return res.status(404).json({ message: 'Review không tìm thấy.' });
            }
            res.json(review);
        } catch (error) {
            console.error("Error getting review:", error);
            next(error);
        }
    }

    async updateReview(req, res, next) {
        try {
            const updatedReview = await ReviewService.updateReview(req.params.id, req.body, req.user._id);
            res.json(updatedReview);
        } catch (error) {
            console.error("Error updating review:", error);
            next(error);
        }
    }

    async deleteReview(req, res, next) {
        try {
            await ReviewService.deleteReview(req.params.id, req.user._id);
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting review:", error);
            next(error);

        }
    }

    async addReply(req, res, next) {
        try {
            const updatedReview = await ReviewService.addReply(req.params.reviewId, req.body, req.user._id);
            res.json(updatedReview);
        } catch (error) {
            console.error("Error adding reply:", error);
            next(error);
        }
    }

    async getReviewsByProduct(req, res, next) {
        try {
            const reviews = await ReviewService.getReviewsByProduct(req.params.productId);
            res.json(reviews);
        } catch (error) {
            console.error("Error getting reviews:", error);
            next(error);
        }
    }

    async getReviewsByRating(req, res, next) {
        try {
            const rating = parseInt(req.params.rating, 10);
            const reviews = await ReviewService.getReviewsByRating(rating);
            res.json(reviews);
        } catch (error) {
            console.error("Error getting reviews by rating:", error);
            next(error);
        }
    }

    async getReviewCountByRating(req, res, next) {
        try {
            const rating = parseInt(req.params.rating, 10);
            const count = await ReviewService.getReviewCountByRating(rating);
            res.json({ rating, count });
        } catch (error) {
            console.error("Error getting review count:", error);
            next(error);
        }
    }

    async getAllReviewCounts(req, res, next) {
        try {
            const counts = await ReviewService.getAllReviewCounts();
            res.json(counts);
        } catch (error) {
            console.error("Error getting all review counts:", error);
            next(error);
        }
    }
}

module.exports = new ReviewController();