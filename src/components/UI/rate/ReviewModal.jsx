import React, { useState } from "react";

const ReviewModal = ({ toggleModal, addReview, productId }) => {
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (userRating === 0 || review.trim() === "") {
      alert("Vui lòng chọn số sao và nhập nhận xét!");
      return;
    }
    const newReview = {
      userId: localStorage.getItem("userID"),
      productId: productId,
      rating: userRating,
      comment: review,
    };
    addReview(newReview);
    toggleModal();
  };

  return (
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
                className={`text-3xl ${
                  star <= userRating ? "text-yellow-500" : "text-gray-300"
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
  );
};

export default ReviewModal;
