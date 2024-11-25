// controllers/categoryController.js
const categoryService = require('../services/categoryService');

exports.createCategory = async (req, res) => {
    try {
        const savedCategory = await categoryService.createCategory(req.body);
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.status(200).json({ message: 'Danh mục đã được xoá' });
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.searchCategory = async (req, res) => {
    try {
        const categories = await categoryService.searchCategory(req.query.q);
        res.status(200).json(categories);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
};