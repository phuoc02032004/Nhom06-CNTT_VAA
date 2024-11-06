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
        console.log('req.body:', req.body);
        console.log('req.files:', req.files);

        const newProduct = new Product({
            ...req.body,
            stock: Number(req.body.stock),
            price: Number(req.body.price),
            weight: req.body.weight ? Number(req.body.weight) : undefined
        });

        const images = req.files;
        const uploadedImages = [];

        if (images && images.length > 0) {
            for (const image of images) {
                const imageUrl = await uploadImage(image);
                uploadedImages.push({ url: imageUrl });
            }
            newProduct.images = uploadedImages;
        }

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category'); // Populate the 'category' field

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
        const { id } = req.params;

        const productToUpdate = await Product.findById(id);
        if (!productToUpdate) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        productToUpdate.name = req.body.name || productToUpdate.name;
        productToUpdate.description = req.body.description || productToUpdate.description;
        productToUpdate.price = Number(req.body.price) || productToUpdate.price;
        productToUpdate.stock = Number(req.body.stock) || productToUpdate.stock;

        const images = req.files;
        const uploadedImages = [];
        if (images && images.length > 0) {
            for (const image of images) {
                const imageUrl = await uploadImage(image);
                uploadedImages.push({ url: imageUrl });
            }
            productToUpdate.images = uploadedImages;
        } else {
            productToUpdate.images = productToUpdate.images;
        }
        const updatedProduct = await productToUpdate.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to update product.' });
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

exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const products = await Product.find({ category: categoryId });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};