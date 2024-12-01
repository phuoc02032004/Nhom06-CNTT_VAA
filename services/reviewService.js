const Review = require('../models/Review');
const Order = require('../models/Order');
const Product = require('../models/Product');

class ReviewService {
    async createReview(reviewData) {
        const { orderId, productId, rating, comment, userId } = reviewData;

        if (!orderId || !productId || !rating || !userId || rating < 1 || rating > 5) {
            throw new Error('Dữ liệu đầu vào không hợp lệ.');
        }

        const order = await Order.findById(orderId);
        if (!order || order.status !== 'completed') {
            throw new Error('Đơn hàng không hợp lệ hoặc chưa hoàn tất.');
        }

        const productInOrder = order.products.find(p => p.product.toString() === productId);
        if (!productInOrder) {
            throw new Error('Sản phẩm không tìm thấy trong đơn hàng.');
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
            comment
        });

        const savedReview = await newReview.save();

        await Product.findByIdAndUpdate(productId, { $push: { reviews: savedReview._id } });

        const productIndex = order.products.findIndex(p => p.product.toString() === productId);
        if (productIndex !== -1) {
            order.products[productIndex].isReviewed = true;
            await order.save();
        } else {
            throw new Error('Sản phẩm không tìm thấy trong đơn hàng.');
        }

        return savedReview;
    }

    async getReviews(query) {
        return Review.find(query).populate('user product order');
    }

    async getReviewById(id) {
        return Review.findById(id).populate('user product order');
    }

    async updateReview(id, reviewData) {
        const updatedReview = await Review.findByIdAndUpdate(id, reviewData, { new: true });
        if (!updatedReview) {
            throw new Error('Đánh giá không tìm thấy.');
        }
        return updatedReview;
    }

    async deleteReview(id) {
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            throw new Error('Đánh giá không tìm thấy.');
        }
    }
}

module.exports = new ReviewService();