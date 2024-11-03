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
        // Kiểm tra req.body và req.files
        console.log('req.body:', req.body);
        console.log('req.files:', req.files);

        // Tạo đối tượng sản phẩm từ req.body
        const newProduct = new Product({
            ...req.body,
            stock: Number(req.body.stock),
            price: Number(req.body.price),
            weight: req.body.weight ? Number(req.body.weight) : undefined
        });

        // Xử lý hình ảnh nếu có
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
        const { id } = req.params;
        const { images } = req.body; // Lấy mảng images từ request

        // Upload ảnh mới lên Cloudinary
        const uploadedImages = await Promise.all(
            req.files.map((image, index) => {
                const imageId = images[index].id;
                return uploadImage(image, imageId).then(imageUrl => ({ url: imageUrl, id: imageId }));
            })
        );

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                images: uploadedImages
            },
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