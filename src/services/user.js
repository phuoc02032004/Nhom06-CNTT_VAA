import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:3003/api/v1/users';

export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (!response.data.token) {
      throw new Error("Không có token trả về.");
    }

    const token = response.data.token;
    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      throw new Error("Bạn không có quyền truy cập admin.");
    }

    localStorage.setItem("token", token);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Lấy danh sách tất cả người dùng
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL
      // , {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Lấy thông tin chi tiết một người dùng
export const getUser = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Thêm người dùng mới
export const createUser = async (userData, token) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (id, userData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Xóa người dùng
export const deleteUser = async (id, token) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
