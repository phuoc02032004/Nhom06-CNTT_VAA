import React, { useState } from 'react';
import anh1 from "../../assets/sp2.webp";

const ProductCard = () => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };
    return (
        <div className="bg-white p-8 max-w-4xl mx-auto">
            {/* Image Section */}
            <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="flex-1 mb-6 md:mb-0">
                    <img
                        src={anh1}
                        alt="E Stud Bubble Butterfly"
                        className="rounded-lg mx-auto md:mx-0"
                    />
                </div>

                {/* Product Info Section */}
                <div className="flex-1 pl-10">
                    {/* Product Title */}
                    <h1 className="text-2xl font-bold mb-4">E STUD BUBBLE BUTTERFLY</h1>

                    {/* Stock Status */}
                    <p className="text-500 mb-2">
                        Tình trạng: Het hang
                    </p>
                    <p className="text-gray-500 mb-4">Mã SP: BI-2401-7-051</p>
                    <p className="text-gray-500 mb-4">Nhẫn bạc cỡ lớn cao cấp 925 được thiết kế
                        theo phong cách unisex nên dành cho cả nam lẫn nữ .Đây là 1 item
                        không thể thiếu đối với các bạn trẻ hiện đại và cá tính .Hoặc đây
                        cũng là 1 gợi ý cho các cặp đôi để đánh dấu ngày kỉ niệm của mình đó.</p>

                    {/* Product Price */}
                    <div className="text-3xl font-semibold text-brown-700 mb-4">
                        350.000₫
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

                    <button class="bg-transparent hover:bg-[#2e1c11] text-[#2e1c11] font-semibold hover:text-white py-2 px-4 border border-[#2e1c11] hover:border-transparent rounded 
                    w-96 mt-5">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default ProductCard;
=======
export default ProductCard;
>>>>>>> 33f891a9ecba03e575c6eab5047e241f03c833ff
