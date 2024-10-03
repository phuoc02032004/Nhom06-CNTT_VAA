const Product = require('../models/Product');
const cloudinaryConfig = require('../config/cloudinaryConfig');
const { Readable } = require('stream');

const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinaryConfig.uploader.upload_stream((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });

        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);
        readableStream.pipe(stream);
    });
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const images = req.files;
        const uploadedImages = [];

        if (images) {
            for (const image of images) {
                const imageUrl = await uploadImage(image);
                uploadedImages.push({ url: imageUrl });
            }
            newProduct.images = uploadedImages;
        }

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        res.status(200).json({ message: 'Sản phẩm đã được xoá' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
