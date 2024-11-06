
const Cart = require('../models/Cart');

exports.getAll = async (req, res) => {
    try {
        const carts = await Cart.find().populate('products.product');

        if (carts.length > 0) { // Kiểm tra nếu có giỏ hàng
            const formattedCarts = carts.map(cart => ({
                ...cart.toObject(), // Lấy dữ liệu của cart
                products: cart.products.map(productItem => {
                    // Kiểm tra nếu sản phẩm tồn tại trước khi gọi toObject
                    if (productItem.product) {
                        return {
                            ...productItem.product.toObject(), // Lấy dữ liệu của product
                            quantity: productItem.quantity // Bao gồm số lượng
                        };
                    } else {
                        // Nếu không có sản phẩm, có thể trả về một đối tượng rỗng hoặc thông điệp khác
                        return {
                            product: productItem._id,
                            quantity: productItem.quantity // Vẫn giữ số lượng, nhưng sản phẩm không tồn tại
                        };
                    }
                })
            }));
            res.status(200).json(formattedCarts);
        } else {
            // Không có giỏ hàng nào
            res.status(404).json({ message: "No carts found" });
        }
    } catch (error) {
        console.error("Error retrieving carts:", error); // Ghi log lỗi để kiểm tra
        res.status(500).json({ error: error.message });
    }
};



exports.getById = async (req, res) => {
    const cartId = req.params.id;
    if (!cartId) {
        res.status(404).json("cannot find item");
    }
    try {
        const data = await Cart.findById(cartId);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json("cannot find item");
        }
    } catch {
        res.status(500);
    }
};

exports.getCartByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user." });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const Product = require('../models/Product')

exports.createCart = async (req, res) => {
    const userId = req.body.user;
    const products = req.body.products;

    try {
        let existingCart = await Cart.findOne({ user: userId });

        if (existingCart) {
            // Nếu giỏ hàng đã tồn tại, cập nhật số lượng sản phẩm
            products.forEach(item => {
                const existingProduct = existingCart.products.find(p => p.product.toString() === item.product);

                if (existingProduct) {
                    // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
                    existingProduct.quantity += item.quantity;
                } else {
                    // Nếu sản phẩm chưa có, thêm vào danh sách
                    existingCart.products.push(item);
                }
            });

            totalQuantity: totalQuantity+productItem.quantity;
            totalPrice: totalPrice+productItem.price;

            // Lưu giỏ hàng đã cập nhật
            const updatedCart = await existingCart.save();
            return res.status(200).json(updatedCart);

        } else {
            // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng với danh sách sản phẩm
            const newCart = new Cart({
                user: userId,
                products: products, // Thêm danh sách sản phẩm vào giỏ hàng mới
            });

            const savedCart = await newCart.save();
            return res.status(201).json(savedCart);
        }
    } catch (error) {
        console.error("Error creating or updating cart:", error);
        res.status(400).json({ error: error.message });
    }
};




exports.updateCart = async (req, res) => {
    const cartId = req.params.id; // ID của giỏ hàng
    const { productId, quantity } = req.body; // ID sản phẩm và số lượng mới

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cartId, "products.product": productId },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart or product not found" });
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.deleteProductFromCart = async (req, res) => {
    const { cartId, _id } = req.params; 
    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const productIndex = cart.products.findIndex(p => p.product.toString() === _id); 
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
     
        cart.products.splice(productIndex, 1);
        await cart.save();
        
        return res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}