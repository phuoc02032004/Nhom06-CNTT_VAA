import axios from "axios";

const baseURL = "http://localhost:3003/api/v1/reviews";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const reviewApi = {
  getAllReviews: async (query = {}) => {
    try {
      const response = await apiClient.get("/", { params: query });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching reviews:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  createReview: async (reviewData) => {
    try {
      const response = await apiClient.post("/", reviewData);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating review:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getReviewById: async (reviewId) => {
    try {
      const response = await apiClient.get(`/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching review:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  updateReview: async (reviewId, updateData) => {
    try {
      const response = await apiClient.put(`/${reviewId}`, updateData);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating review:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  deleteReview: async (reviewId) => {
    try {
      await apiClient.delete(`/${reviewId}`);
      return { message: "Review deleted successfully" };
    } catch (error) {
      console.error(
        "Error deleting review:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  addReply: async (reviewId, replyData) => {
    try {
      const response = await apiClient.post(`/${reviewId}/replies`, replyData);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding reply:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getReviewsByProduct: async (productId) => {
    try {
      const response = await apiClient.get(`/${productId}/product`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching reviews by product:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default reviewApi;
