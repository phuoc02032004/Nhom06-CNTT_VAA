import axios from 'axios';

const API_URL = 'http://localhost:3003/api/v1/products';

export const getAllProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product ID:', error);
        throw error;
    }
}

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
