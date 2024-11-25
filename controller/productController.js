// controllers/productController.js
const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
    try {
        const savedProduct = await productService.createProduct(req.body, req.files);
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body, req.files);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Sản phẩm đã được xoá' });
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await productService.getProductsByCategory(req.params.categoryId);
        res.status(200).json(products);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

exports.searchProduct = async (req, res) => {
    try {
        const products = await productService.searchProduct(req.query.q);
        res.status(200).json(products);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
};