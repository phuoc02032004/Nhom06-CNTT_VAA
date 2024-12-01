const ReviewService = require('../services/reviewService');

class ReviewController {
    async createReview(req, res) {
        try {
            const newReview = await ReviewService.createReview(req.body);
            res.status(201).json(newReview);
        } catch (error) {
            console.error("Error creating review:", error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Lỗi tạo đánh giá.' });
        }
    }

    async getReviews(req, res) {
        try {
            const reviews = await ReviewService.getReviews(req.query);
            res.json(reviews);
        } catch (error) {
            console.error("Error getting reviews:", error);
            res.status(500).json({ message: error.message || 'Lỗi lấy đánh giá.' });
        }
    }

    async getReviewById(req, res) {
        try {
            const review = await ReviewService.getReviewById(req.params.id);
            if (!review) {
                return res.status(404).json({ message: 'Đánh giá không tìm thấy.' });
            }
            res.json(review);
        } catch (error) {
            console.error("Error getting review:", error);
            res.status(500).json({ message: error.message || 'Lỗi lấy đánh giá.' });
        }
    }

    async updateReview(req, res) {
        try {
            const updatedReview = await ReviewService.updateReview(req.params.id, req.body);
            res.json(updatedReview);
        } catch (error) {
            console.error("Error updating review:", error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Lỗi cập nhật đánh giá.' });
        }
    }

    async deleteReview(req, res) {
        try {
            await ReviewService.deleteReview(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting review:", error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Lỗi xóa đánh giá.' });
        }
    }
}

module.exports = new ReviewController();