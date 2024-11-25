// controllers/userController.js
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({ message: 'Đăng ký thành công, vui lòng kiểm tra email để xác thực' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await userService.loginUser(req.body.email, req.body.password);
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        res.status(401).json({ message: error.message }); // 401 Unauthorized
    }
};


exports.verifyEmail = async (req, res) => {
    try {
        await userService.verifyUserEmail(req.body.verificationCode);
        res.status(200).json({ message: 'Xác thực email thành công' });
    } catch (error) {
        res.status(404).json({ message: error.message }); //404 Not Found
    }
};

exports.update = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({ message: 'Cập nhật thành công', user });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({ message: 'Xóa người dùng thành công' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.get = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        await userService.forgotPassword(req.body.email);
        res.status(200).json({ message: 'Vui lòng kiểm tra email để đặt lại mật khẩu' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        await userService.resetPassword(req.body.verificationCode, req.body.password);
        res.status(200).json({ message: 'Đặt lại mật khẩu thành công' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({ message: 'Cập nhật thông tin cá nhân thành công', user });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        await userService.addToCart(req.params.id, req.body.productId, req.body.quantity);
        res.status(200).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        await userService.removeFromCart(req.params.id, req.params.productId);
        res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.updateCartQuantity = async (req, res) => {
    try {
        await userService.updateCartQuantity(req.params.id, req.params.productId, req.body.quantity);
        res.status(200).json({ message: 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.viewCart = async (req, res) => {
    try {
        const cart = await userService.getCart(req.params.id);
        res.status(200).json({ cart });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        await userService.addToWishlist(req.params.id, req.body.productId);
        res.status(200).json({ message: 'Thêm sản phẩm vào danh sách yêu thích thành công' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        await userService.removeFromWishlist(req.params.id, req.params.productId);
        res.status(200).json({ message: 'Xóa sản phẩm khỏi danh sách yêu thích thành công' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.viewWishlist = async (req, res) => {
    try {
        const wishlist = await userService.getWishlist(req.params.id);
        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};