import axios from "axios";

const API_URL = "http://localhost:3003/api/v1/reviews";

export const createReview = async (productId, token, rating, comment) => {
  try {
    const response = await axios.post(
      `${API_URL}`,
      {
        rating,
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

// Lấy tất cả các đánh giá
export const getAllReviews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting reviews:", error);
    throw error;
  }
};

// Lấy đánh giá theo ID
export const getReviewById = async (reviewId) => {
  try {
    const response = await axios.get(`${API_URL}/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting review by ID:", error);
    throw error;
  }
};

// Cập nhật một đánh giá
export const updateReview = async (reviewId, rating, comment, userId) => {
  try {
    const response = await axios.put(
      `${API_URL}/${reviewId}`,
      {
        rating,
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`, // Giả sử bạn cần gửi token người dùng
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

// Xóa một đánh giá
export const deleteReview = async (reviewId, userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.status === 204; // Nếu xóa thành công, trả về true
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

// Thêm phản hồi vào đánh giá
export const addReply = async (reviewId, content, userId) => {
  try {
    const response = await axios.post(
      `${API_URL}/${reviewId}/replies`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding reply:", error);
    throw error;
  }
};

// Lấy các đánh giá của sản phẩm
export const getReviewsByProduct = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting reviews by product:", error);
    throw error;
  }
};
// Lấy các đánh giá theo rating
export const getReviewsByRating = async (rating) => {
  try {
    const response = await axios.get(`${API_URL}/rating/${rating}`);
    return response.data;
  } catch (error) {
    console.error("Error getting reviews by rating:", error);
    throw error;
  }
};

// Lấy số lượng đánh giá theo rating
export const getReviewCountByRating = async (rating) => {
  try {
    const response = await axios.get(`${API_URL}/count/${rating}`);
    return response.data;
  } catch (error) {
    console.error("Error getting review count by rating:", error);
    throw error;
  }
};

// Lấy tổng số đánh giá của tất cả các rating
export const getAllReviewCounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/counts`);
    return response.data;
  } catch (error) {
    console.error("Error getting all review counts:", error);
    throw error;
  }
};
