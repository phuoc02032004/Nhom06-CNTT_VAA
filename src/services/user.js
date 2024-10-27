import axios from 'axios';
const registerUser = async (userData) => {
    try {
        const response = await axios.post('http://localhost:3005/users/register', userData);
        return response;
    } catch (error) {
        throw error;
    }
};

const verify = async (email, verificationCode) => {
    try {
        const response = await axios.post('http://localhost:3005/users/verify', {
            email: email,
            verificationCode: verificationCode
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:3005/users/login', {
            email,
            password
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export {getAuthHeaders}
export { registerUser };
export { verify };
export { loginUser };