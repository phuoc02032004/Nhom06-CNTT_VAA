const Review = require('../models/Review');
const Order = require('../models/Order');
const { validationResult } = require('express-validator');
class CustomError extends Error {
    constructor(message, statusCode, data = {}) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}

class ReviewService {
    async createReview(productId, user, reviewData) {
        const errors = validationResult(reviewData);
        if (!errors.isEmpty()) {
            throw new CustomError('Dữ liệu review không hợp lệ', 400, { errors: errors.array() });
        }

        const order = await this.findOrder(productId, user);
        if (!order) {
            throw new CustomError('Bạn chưa mua sản phẩm này.', 403);
        }

        const existingReview = await Review.findOne({ user: user, product: productId });
        if (existingReview) {
            throw new CustomError('Bạn đã đánh giá sản phẩm này rồi.', 400);
        }

        const newReview = new Review({ ...reviewData, user: user, product: productId });
        return await newReview.save();
    }

    async findOrder(productId, user) {
        const order = await Order.findOne({
            user: user,
            'products.product': productId,
            status: 'completed'
        }).populate('products.product');
        return order;
    }


    async getReviews(query) {
        return await Review.find(query).populate('user product order replies.user');
    }

    async getReviewById(id) {
        return await Review.findById(id).populate('user product order replies.user');
    }

    async updateReview(id, reviewData, user) {
        const review = await Review.findById(id);
        if (!review) {
            throw new CustomError('Review không tồn tại', 404);
        }
        if (!review.user.equals(user)) {
            throw new CustomError('Bạn không có quyền cập nhật review này', 403);
        }
        const updatedReview = await Review.findByIdAndUpdate(id, reviewData, { new: true });
        return updatedReview;
    }


    async deleteReview(id, user) {
        const review = await Review.findById(id);
        if (!review) {
            throw new CustomError('Review không tồn tại', 404);
        }
        if (!review.user.equals(user)) {
            throw new CustomError('Bạn không có quyền xóa review này', 403);
        }
        await Review.findByIdAndDelete(id);
    }

    async addReply(reviewId, replyData, user) {
        const { content } = replyData;
        if (!content) {
            throw new CustomError('Nội dung trả lời không được để trống', 400);
        }
        const newReply = { user: user, content, createdAt: Date.now() };
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { $push: { replies: newReply } },
            { new: true }
        ).populate('replies.user');
        return updatedReview;
    }

    async getReviewsByProduct(productId) {
        return await Review.find({ product: productId }).populate('user order replies.user').sort({ createdAt: -1 });
    }

    async getReviewsByRating(rating) {
        if (isNaN(rating) || rating < 1 || rating > 5) {
            throw new CustomError('Đánh giá không hợp lệ', 400);
        }
        return await Review.find({ rating: rating }).populate('user product order replies.user');
    }

    async getReviewCountByRating(rating) {
        if (isNaN(rating) || rating < 1 || rating > 5) {
            throw new CustomError('Đánh giá không hợp lệ', 400);
        }
        const count = await Review.countDocuments({ rating });
        return count;
    }

    async getAllReviewCounts() {
        return await Review.aggregate([
            {
                $group: {
                    _id: "$rating",
                    count: { $sum: 1 }
                }
            }
        ]);
    }
}

module.exports = new ReviewService();