const Review = require('../models/Review');

exports.createReview = async (reviewData) => {
    const newReview = new Review(reviewData);
    return await newReview.save();
};

exports.getAllReviews = async () => {
    return await Review.find();
};

exports.getReviewById = async (id) => {
    const review = await Review.findById(id);
    if (!review) throw new Error('Đánh giá không tồn tại');
    return review;
};

exports.updateReview = async (id, updateData) => {
    const updatedReview = await Review.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedReview) throw new Error('Đánh giá không tồn tại');
    return updatedReview;
};

exports.deleteReview = async (id) => {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) throw new Error('Đánh giá không tồn tại');
    return deletedReview;
};