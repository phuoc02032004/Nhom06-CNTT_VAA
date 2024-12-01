import React, { useState } from "react";

const Rating = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [review, setReview] = useState("");

    const ratings = {
        overall: 5,
        totalReviews: 2,
        starDistribution: [
            { stars: 5, count: 2 },
            { stars: 4, count: 0 },
            { stars: 3, count: 0 },
            { stars: 2, count: 0 },
            { stars: 1, count: 0 },
        ],
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSubmit = () => {
        console.log("User Rating:", userRating);
        console.log("User Review:", review);
        alert("Đánh giá của bạn đã được gửi!");
        setIsModalOpen(false);
    };

    return (
        <div className="rating-container border border-gray-300 rounded-lg p-5 w-3/6 mx-auto">
            <h3 className="text-xl font-semibold mb-3">
                Đánh giá & nhận xét {product?.name || "Sản phẩm"}
            </h3>
            <div className="flex items-center mb-5">
                <div className="text-3xl font-bold">{ratings.overall}/5</div>
                <div className="ml-3 text-yellow-500">
                    {"★".repeat(ratings.overall)}
                    {"☆".repeat(5 - ratings.overall)}
                </div>
                <div className="ml-3 text-gray-500">{ratings.totalReviews} đánh giá</div>
            </div>
            <div>
                {ratings.starDistribution.map((star) => (
                    <div key={star.stars} className="flex items-center mb-2">
                        <span className="w-6">{star.stars}★</span>
                        <div className="bg-gray-300 w-full h-2 mx-2 relative">
                            <div
                                className="bg-yellow-500 h-2"
                                style={{
                                    width: `${(star.count / ratings.totalReviews) * 100}%`,
                                }}
                            ></div>
                        </div>
                        <span>{star.count} đánh giá</span>
                    </div>
                ))}
            </div>
            <h4 className="mt-5">Đánh giá theo trải nghiệm</h4>
            <div className="text-center mt-5">
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    onClick={toggleModal}
                >
                    Đánh giá ngay
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Chọn số sao:</label>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setUserRating(star)}
                                        className={`text-3xl ${star <= userRating
                                            ? "text-yellow-500"
                                            : "text-gray-300"
                                            }`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nhận xét:</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-2"
                                rows="4"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
                                onClick={toggleModal}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                                onClick={handleSubmit}
                            >
                                Gửi đánh giá
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rating;
