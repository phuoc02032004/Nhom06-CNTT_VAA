import axios from 'axios';

const API_URL = 'http://localhost:3003/carts';

export const getCartItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCartItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};


export const AddtoCart = async (productId) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      user: "67021eb674b946ce95bf64ed", 
      products: [{ 
        product: productId,
        quantity: 1 
      }],
      totalPrice:1,
      totalQuantity:1,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (id, quantity) => {
  try{
  const response = await axios.put(`${API_URL}/${id}`, {
    quantity,
  });
  return response.data;
}catch (error) {
  throw error;
}
};





