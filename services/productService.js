const Product = require('../models/Product');
const Order = require('../models/Order');
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


exports.createProduct = async (productData, images) => {
    const newProduct = new Product({
        ...productData,
        stock: Number(productData.stock),
        price: Number(productData.price),
        weight: productData.weight ? Number(productData.weight) : undefined
    });

    const uploadedImages = [];
    if (images && images.length > 0) {
        for (const image of images) {
            const imageUrl = await uploadImage(image);
            uploadedImages.push({ url: imageUrl });
        }
        newProduct.images = uploadedImages;
    }

    return await newProduct.save();
};

exports.getAllProducts = async () => {
    return await Product.find().populate('category');
};

exports.getProductById = async (id) => {
    const product = await Product.findById(id).populate('category');
    if (!product) throw new Error('Sản phẩm không tồn tại');
    return product;
};

exports.updateProduct = async (id, productData, images) => {
    const productToUpdate = await Product.findById(id);
    if (!productToUpdate) throw new Error('Sản phẩm không tồn tại');

    productToUpdate.name = productData.name || productToUpdate.name;
    productToUpdate.description = productData.description || productToUpdate.description;
    productToUpdate.price = Number(productData.price) || productToUpdate.price;
    productToUpdate.stock = Number(productData.stock) || productToUpdate.stock;
    productToUpdate.category = productData.category || productToUpdate.category;
    productToUpdate.material = productData.material || productToUpdate.material;
    productToUpdate.weight = Number(productData.weight) || productToUpdate.weight;
    productToUpdate.dimensions = productData.dimensions || productToUpdate.dimensions;
    productToUpdate.color = productData.color || productToUpdate.color;
    productToUpdate.style = productData.style || productToUpdate.style;
    productToUpdate.origin = productData.origin || productToUpdate.origin;
    productToUpdate.manufacturer = productData.manufacturer || productToUpdate.manufacturer;

    const uploadedImages = [];
    if (images && images.length > 0) {
        for (const image of images) {
            const imageUrl = await uploadImage(image);
            uploadedImages.push({ url: imageUrl });
        }
        productToUpdate.images = uploadedImages;
    }


    return await productToUpdate.save();
};

exports.deleteProduct = async (id) => {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) throw new Error('Sản phẩm không tồn tại');
    return deletedProduct;
};

exports.getProductsByCategory = async (categoryId) => {
    const products = await Product.find({ category: categoryId });
    if (products.length === 0) throw new Error('No products found for this category');
    return products;
};

exports.searchProduct = async (q) => {
    if (!q) throw new Error('Search query is required.');
    return await Product.find({ name: { $regex: q, $options: 'i' } }).populate('category');
};

exports.getProductBuyersAndOrders = async (productId) => {
    const orders = await Order.find({ 'products.product': productId })
        .populate('user', 'name email') // Populate user name and email
        .select('user _id products createdAt'); // Select necessary fields

    if (!orders || orders.length === 0) {
        return { message: 'No orders found for this product.' }; // Trả về một object có message thay vì throw error
    }

    const buyersAndOrders = orders.map(order => {
        const user = order.user; // Access user directly
        return {
            userId: user._id,
            userName: user.name || 'Người dùng không xác định', // Handle null or undefined name
            userEmail: user.email || 'Email không xác định', // Handle null or undefined email
            orderId: order._id,
            orderDate: order.createdAt,
            products: order.products.find(p => p.product.equals(productId)), // Find the specific product in the order
        };
    });

    return buyersAndOrders;
};