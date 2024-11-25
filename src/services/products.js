import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3003/api/v1/products');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductId = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3003/api/v1/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductCategory = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3003/api/v1/products/category/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}