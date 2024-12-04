const ReviewService = require('../services/reviewService');

class ReviewController {
    async createReview(req, res) {
        try {
            const newReview = await ReviewService.createReview(req.body);
            res.status(201).json(newReview);
        } catch (error) {
            console.error("Error creating review:", error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Lỗi tạo review.' });
        }
    }

    async getReviews(req, res) {
        try {
            const reviews = await ReviewService.getReviews(req.query);
            res.json(reviews);
        } catch (error) {
            console.error("Error getting reviews:", error);
            res.status(500).json({ message: error.message || 'Lỗi lấy reviews.' });
        }
    }

    async getReviewById(req, res) {
        try {
            const review = await ReviewService.getReviewById(req.params.id);
            if (!review) {
                return res.status(404).json({ message: 'Review không tìm thấy.' });
            }
            res.json(review);
        } catch (error) {
            console.error("Error getting review:", error);
            res.status(500).json({ message: error.message || 'Lỗi lấy review.' });
        }
    }

    async updateReview(req, res) {
        try {
            const updatedReview = await ReviewService.updateReview(req.params.id, req.body);
            res.json(updatedReview);
        } catch (error) {
            console.error("Error updating review:", error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Lỗi cập nhật review.' });
        }
    }

    async deleteReview(req, res) {
        try {
            await ReviewService.deleteReview(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting review:", error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Lỗi xóa review.' });
        }
    }

    async addReply(req, res) {
        try {
            const updatedReview = await ReviewService.addReply(req.params.reviewId, req.body);
            res.json(updatedReview);
        } catch (error) {
            console.error("Error adding reply:", error);
            res.status(500).json({ message: error.message || 'Lỗi thêm reply.' });
        }
    }

    async getReviewsByProduct(req, res) {
        try {
            const reviews = await ReviewService.getReviewsByProduct(req.params.productId);
            res.json(reviews);
        } catch (error) {
            console.error("Error getting reviews:", error);
            res.status(500).json({ message: error.message || 'Lỗi lấy reviews.' });
        }
    }

    async getReviewsByRating(req, res) {
        try {
            const rating = parseInt(req.params.rating, 10);
            const reviews = await ReviewService.getReviewsByRating(rating);
            res.json(reviews);
        } catch (error) {
            console.error("Error getting reviews by rating:", error);
            res.status(error.statusCode || 400).json({ message: error.message });
        }
    }
}

module.exports = new ReviewController();