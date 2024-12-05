import React, { useState, useEffect } from "react";
import { getReviewsByProduct, createReview } from "../../../services/rating";
import StarDistribution from "./StarDistribution";
import ReviewList from "./ReviewList";
import ReviewModal from "./ReviewModal";

const Rating = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("Tất cả");
  const [error, setError] = useState("");

  const [ratings, setRatings] = useState({
    overall: 0,
    totalReviews: 0,
    starDistribution: [
      { stars: 5, count: 0 },
      { stars: 4, count: 0 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
  });

  // Fetch all reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      if (!product || !product._id) {
        console.error("Product data is missing or invalid.");
        return;
      }
      try {
        setLoading(true);
        const fetchedReviews = await getReviewsByProduct(product._id);
        setReviews(fetchedReviews);
        calculateRatings(fetchedReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Không thể tải đánh giá. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product._id]);

  // Calculate star distribution and average rating
  const calculateRatings = (reviews) => {
    const totalReviews = reviews.length;
    const starCount = [0, 0, 0, 0, 0]; // Index 0 -> 4 tương ứng với 1 -> 5 sao

    reviews.forEach((review) => {
      starCount[review.rating - 1]++;
    });

    const overall =
      reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

    setRatings({
      overall: overall || 0,
      totalReviews,
      starDistribution: starCount
        .map((count, index) => ({ stars: index + 1, count }))
        .reverse(),
    });
  };

  // Filter reviews
  const filteredReviews =
    filter === "Tất cả"
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(filter));

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const addReview = async (newReview) => {
    try {
      const response = await createReview(newReview);
      setReviews((prev) => [response, ...prev]);
      calculateRatings([response, ...reviews]);
    } catch (err) {
      console.error("Error adding review:", err);
      setError("Không thể thêm đánh giá. Vui lòng thử lại.");
    }
  };

  return (
    <div className="rating-container border border-gray-300 rounded-lg p-5 w-3/6 mx-auto">
      <h3 className="text-xl font-semibold mb-3">
        Đánh giá & nhận xét {product?.name || "Sản phẩm"}
      </h3>
      <div className="flex items-center mb-5">
        <div className="text-3xl font-bold">{ratings.overall.toFixed(1)}/5</div>
        <div className="ml-3 text-yellow-500">
          {"★".repeat(Math.floor(ratings.overall))}
          {"☆".repeat(5 - Math.floor(ratings.overall))}
        </div>
        <div className="ml-3 text-gray-500">
          {ratings.totalReviews} đánh giá
        </div>
      </div>

      {/* Star Distribution */}
      <StarDistribution ratings={ratings} />

      {/* Filter Section */}
      <div className="mt-8">
        <h4 className="font-semibold">Lọc theo</h4>
        <div className="flex items-center mt-3 space-x-3">
          {["Tất cả", 5, 4, 3, 2, 1].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 border rounded-lg ${
                filter === filterOption
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <p>Đang tải đánh giá...</p>
      ) : (
        <ReviewList reviews={filteredReviews} />
      )}

      {/* Review Modal */}
      <div className="text-center mt-5">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          onClick={toggleModal}
        >
          Đánh giá ngay
        </button>
      </div>
      {isModalOpen && (
        <ReviewModal
          toggleModal={toggleModal}
          addReview={addReview}
          productId={
            product._id || { _id: null, name: "Sản phẩm chưa xác định" }
          }
        />
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Rating;
