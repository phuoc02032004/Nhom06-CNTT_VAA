import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3003/api/v1/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductId = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3003/api/v1/products/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductCategory = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3003/api/v1/products/category/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    if (!query) {
      throw new Error("Search query is required.");
    }

    const response = await axios.get(
      "http://localhost:3003/api/v1/products/search",
      {
        params: { q: query },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};
