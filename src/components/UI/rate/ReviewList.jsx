import React from "react";

const ReviewList = ({ reviews }) => {
  return (
    <div className="mt-5">
      {reviews.map((review) => (
        <div key={review._id} className="mb-4 border-b pb-3">
          <div className="flex items-center justify-between">
            {/* Tên người đánh giá */}
            <h5 className="font-bold">{review.user?.name || "Anonymous"}</h5>
            {/* Ngày tạo */}
            <span className="text-gray-500 text-sm">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="text-yellow-500">
            {/* Hiển thị xếp hạng sao */}
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>
          <p className="mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
