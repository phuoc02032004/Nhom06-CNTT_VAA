const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const emailUtils = require('../utils/email');
const { sendVerificationEmail, generateResetPasswordToken, sendResetPasswordEmail } = require('../utils/email');
const Product = require("../models/Product");

exports.register = async (req, res) => {
    const { email, password, name, address, phone } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email đã được sử dụng' });

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Mật khẩu phải chứa ít nhất 6 ký tự, bao gồm 1 ký tự in hoa và 1 ký tự đặc biệt'
            });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({ email, password, name, address, phone, verificationCode });

        await user.save();
        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: 'Đăng ký thành công, vui lòng kiểm tra email để xác thực' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Email nhận được:', email);  // Log email
        console.log('Password nhận được:', password);  // Log password

        const user = await User.findOne({ email }).select('+password');
        console.log('Người dùng tìm thấy:', user);  // Log đối tượng người dùng

        if (!user) {
            console.log('Không tìm thấy người dùng với email này');
            return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác' });
        }

        console.log('Mật khẩu mã hóa trong CSDL:', user.password);  // Log mật khẩu mã hóa
        const isMatch = await user.matchPassword(password);
        console.log('Kết quả so sánh mật khẩu:', isMatch);  // Log kết quả so sánh

        if (!isMatch) {
            console.log('Mật khẩu không khớp');
            return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log('Đăng nhập thành công. Token:', token);  // Log token tạo thành công
        res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        console.error('Lỗi trong quá trình đăng nhập:', error);  // Log chi tiết lỗi
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
    const { verificationCode } = req.body;
    try {
        const user = await User.findOne({ verificationCode });
        if (!user) return res.status(404).json({ message: 'Mã xác thực không hợp lệ' });

        user.verified = true;
        await user.save();
        res.status(200).json({ message: 'Xác thực email thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'Người dùng không tìm thấy' });

        res.status(200).json({ message: 'Cập nhật thành công', user });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'Người dùng không tìm thấy' });

        res.status(200).json({ message: 'Xóa người dùng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'Người dùng không tìm thấy' });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .populate('user');

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email không tồn tại' });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo mã xác thực
        user.verificationCode = verificationCode; // Gán mã xác thực
        user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
        await user.save(); // Lưu lại người dùng vào database
        await emailUtils.sendResetPasswordEmail(email, verificationCode); // Gửi email với mã xác thực

        res.status(200).json({ message: 'Vui lòng kiểm tra email để đặt lại mật khẩu' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { verificationCode } = req.body; // Lấy mã xác thực từ body
        const { password } = req.body;

        const user = await User.findOne({ verificationCode: verificationCode, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: 'Mã khôi phục mật khẩu không hợp lệ hoặc đã hết hạn' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.verificationCode = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Đặt lại mật khẩu thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tìm thấy' });
        }

        res.status(200).json({ message: 'Cập nhật thông tin cá nhân thành công', user });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, quantity } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tìm thấy' });
        }

        const existingProductIndex = user.cart.findIndex(item => item.product.toString() === productId.toString());

        if (existingProductIndex !== -1) {
            user.cart[existingProductIndex].quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        res.status(200).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tìm thấy' });
        }

        user.cart = user.cart.filter(item => item.product.toString() !== productId.toString());
        await user.save();
        res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.updateCartQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId } = req.params;
        const { quantity } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tìm thấy' });
        }

        const productIndex = user.cart.findIndex(item => item.product.toString() === productId.toString());
        if (productIndex !== -1) {
            user.cart[productIndex].quantity = quantity;
            await user.save();
            res.status(200).json({ message: 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công' });
        } else {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.viewCart = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).populate('cart.product');
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tìm thấy' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tìm thấy' });
        }

        const existingProductIndex = user.wishlist.findIndex(item => item.toString() === productId.toString());

        if (existingProductIndex !== -1) {
            return res.status(400).json({ message: 'Sản phẩm đã có trong danh sách yêu thích' });
        }

        user.wishlist.push(productId);
        await user.save();
        res.status(200).json({ message: 'Thêm sản phẩm vào danh sách yêu thích thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tìm thấy' });
        }

        user.wishlist = user.wishlist.filter(item => item.toString() !== productId.toString());
        await user.save();
        res.status(200).json({ message: 'Xóa sản phẩm khỏi danh sách yêu thích thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};

exports.viewWishlist = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).populate('wishlist');
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tìm thấy' });
        }

        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};
