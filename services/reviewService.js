const Review = require('../models/Review');
const Product = require('../models/Product');

class ReviewService {
    async createReview(reviewData) {
        const { orderId, productId, rating, comment, userId, replies } = reviewData;

        if (!orderId || !productId || !rating || !userId || rating < 1 || rating > 5 || !comment) {
            throw new Error('Dữ liệu đầu vào không hợp lệ.');
        }

        const existingReview = await Review.findOne({ user: userId, product: productId, order: orderId });
        if (existingReview) {
            throw new Error('Bạn đã đánh giá sản phẩm này rồi.');
        }

        const newReview = new Review({
            user: userId,
            order: orderId,
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
}

module.exports = new ReviewService();