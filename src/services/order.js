import axios from 'axios';


const API_URL = 'http://localhost:3003/api/v1/orders';


export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const getAllOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
