import React, { useState } from "react";
import { AddtoCart } from "../../services/cart";

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = async () => {
        try {
            const userID = localStorage.getItem("userID");
            await AddtoCart(userID, product._id, quantity);
            alert(`Đã thêm ${product.name} vào giỏ hàng.`);
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
        }
    };

    if (!product) {
        return <p>Đang tải sản phẩm...</p>;
    }

    return (
        <div className="bg-white p-8 max-w-4xl mx-auto">
            {/* Image Section */}
            <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="flex-1 mb-6 md:mb-0">
                    <img
                        src={
                            product.images && product.images.length > 0
                                ? product.images[0].url
                                : "default-image-url"
                        }
                        alt={product.name}
                        className="rounded-lg mx-auto md:mx-0"
                    />
                </div>

                {/* Product Info Section */}
                <div className="flex-1 pl-10">
                    {/* Product Title */}
                    <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

                    {/* Stock Status */}
                    <p className="text-gray-500 mb-2">
                        Tình trạng: {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                    </p>
                    <p className="text-gray-500 mb-4">Mã Sản Phẩm: {product._id}</p>
                    <p className="text-gray-500 mb-4">{product.description}</p>

                    {/* Product Price */}
                    <div className="text-3xl font-semibold text-brown-700 mb-4">
                        {product.price}₫
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">Số lượng:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                                onClick={decreaseQuantity}
                                className="px-3 py-1 text-gray-700 hover:text-white hover:bg-gray-500 transition"
                            >
                                -
                            </button>
                            <span className="px-4 py-1">{quantity}</span>
                            <button
                                onClick={increaseQuantity}
                                className="px-3 py-1 text-gray-700 hover:text-white hover:bg-gray-500 transition"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        className="bg-transparent hover:bg-[#2e1c11] text-[#2e1c11] font-semibold hover:text-white py-2 px-4 border border-[#2e1c11] hover:border-transparent rounded w-96 mt-5"
                        onClick={handleAddToCart}
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
