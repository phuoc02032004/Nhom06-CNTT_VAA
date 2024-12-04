const Review = require('../models/Review');
const Product = require('../models/Product');

class ReviewService {
    async createReview(reviewData) {
        const { productId, rating, comment, userId, replies } = reviewData;

        if (!productId || !rating || !userId || rating < 1 || rating > 5 || !comment) {
            throw new Error('Dữ liệu đầu vào không hợp lệ.');
        }

        const existingReview = await Review.findOne({ user: userId, product: productId });
        if (existingReview) {
            throw new Error('Bạn đã đánh giá sản phẩm này rồi.');
        }

        const newReview = new Review({
            user: userId,
            product: productId,
            rating,
            comment,
            replies: replies || [] // Khởi tạo mảng replies nếu chưa có
        });

        const savedReview = await newReview.save();
        await Product.findByIdAndUpdate(productId, { $push: { reviews: savedReview._id } });
        return savedReview;
    }

    async getReviews(query) {
        return Review.find(query).populate('user product order replies.user');
    }

    async getReviewById(id) {
        return Review.findById(id).populate('user product order replies.user');
    }

    async updateReview(id, reviewData) {
        const updatedReview = await Review.findByIdAndUpdate(id, reviewData, { new: true });
        if (!updatedReview) {
            throw new Error('Review không tìm thấy.');
        }
        return updatedReview;
    }

    async deleteReview(id) {
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            throw new Error('Review không tìm thấy.');
        }
    }

    async addReply(reviewId, replyData) {
        const { userId, content } = replyData;
        if (!userId || !content) {
            throw new Error('Dữ liệu reply không hợp lệ');
        }
        const newReply = { user: userId, content, createdAt: Date.now() };
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { $push: { replies: newReply } },
            { new: true }
        );
        if (!updatedReview) {
            throw new Error('Review không tìm thấy.');
        }
        return updatedReview;
    }

    async getReviewsByProduct(productId) {
        return Review.find({ product: productId }).populate('user order replies.user').sort({ createdAt: -1 });
    }

    async getReviewsByRating(rating) {
        if (isNaN(rating) || rating < 1 || rating > 5) {
            throw new Error('Invalid rating. Rating must be a number between 1 and 5.');
        }
        return Review.find({ rating: rating }).populate('user product order replies.user');
    }
}

module.exports = new ReviewService();