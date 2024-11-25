const reviewService = require('../services/reviewService');

exports.createReview = async (req, res) => {
    try {
        const savedReview = await reviewService.createReview(req.body);
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        res.status(200).json(review);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await reviewService.updateReview(req.params.id, req.body);
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await reviewService.deleteReview(req.params.id);
        res.status(200).json({ message: 'Đánh giá đã được xoá' });
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};