const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendVerificationEmail } = require('../utils/email');

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
