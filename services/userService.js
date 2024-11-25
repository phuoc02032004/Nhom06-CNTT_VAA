const User = require('../models/User');
const bcrypt = require('bcrypt');
const emailUtils = require('../utils/email');

exports.registerUser = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new Error('Email đã được sử dụng');

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
    if (!passwordRegex.test(userData.password)) {
        throw new Error('Mật khẩu phải chứa ít nhất 6 ký tự, bao gồm 1 ký tự in hoa và 1 ký tự đặc biệt');
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    userData.verificationCode = verificationCode;
    const user = new User(userData);
    await user.save();
    await emailUtils.sendVerificationEmail(userData.email, verificationCode);
    return user;
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('Email hoặc mật khẩu không chính xác');
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error('Email hoặc mật khẩu không chính xác');
    return user;
};

exports.verifyUserEmail = async (verificationCode) => {
    const user = await User.findOne({ verificationCode });
    if (!user) throw new Error('Mã xác thực không hợp lệ');
    user.verified = true;
    await user.save();
    return user;
};

exports.updateUser = async (id, updates) => {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) throw new Error('Người dùng không tìm thấy');
    return user;
};

exports.deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('Người dùng không tìm thấy');
    return user;
};

exports.getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error('Người dùng không tìm thấy');
    return user;
};

exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
};

exports.forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email không tồn tại');
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
    await user.save();
    await emailUtils.sendResetPasswordEmail(email, verificationCode);
    return user;
};

exports.resetPassword = async (verificationCode, password) => {
    const user = await User.findOne({ verificationCode, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) throw new Error('Mã khôi phục mật khẩu không hợp lệ hoặc đã hết hạn');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.verificationCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return user;
};

exports.addToCart = async (userId, productId, quantity) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Người dùng không tìm thấy');

    const existingProductIndex = user.cart.findIndex(item => item.product.toString() === productId.toString());

    if (existingProductIndex !== -1) {
        user.cart[existingProductIndex].quantity += quantity;
    } else {
        user.cart.push({ product: productId, quantity });
    }

    await user.save();
    return user;
};

exports.removeFromCart = async (userId, productId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Người dùng không tìm thấy');
    user.cart = user.cart.filter(item => item.product.toString() !== productId.toString());
    await user.save();
    return user;
};

exports.updateCartQuantity = async (userId, productId, quantity) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Người dùng không tìm thấy');

    const productIndex = user.cart.findIndex(item => item.product.toString() === productId.toString());
    if (productIndex === -1) throw new Error('Sản phẩm không tồn tại trong giỏ hàng');

    user.cart[productIndex].quantity = quantity;
    await user.save();
    return user;
};

exports.getCart = async (userId) => {
    const user = await User.findById(userId).populate('cart.product');
    if (!user) throw new Error('Người dùng không tìm thấy');
    return user.cart;
};

exports.addToWishlist = async (userId, productId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Người dùng không tìm thấy');

    const existingProductIndex = user.wishlist.findIndex(item => item.toString() === productId.toString());
    if (existingProductIndex !== -1) throw new Error('Sản phẩm đã có trong danh sách yêu thích');

    user.wishlist.push(productId);
    await user.save();
    return user;
};

exports.removeFromWishlist = async (userId, productId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Người dùng không tìm thấy');
    user.wishlist = user.wishlist.filter(item => item.toString() !== productId.toString());
    await user.save();
    return user;
};

exports.getWishlist = async (userId) => {
    const user = await User.findById(userId).populate('wishlist');
    if (!user) throw new Error('Người dùng không tìm thấy');
    return user.wishlist;
};