import axios from 'axios';

const API_URL = 'http://localhost:3003/carts';

const getCartItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const removeCartItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export { getCartItems, removeCartItem };
