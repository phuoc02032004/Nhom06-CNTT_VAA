import axios from 'axios';

const getProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3003/api/v1/products');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getProducts };
