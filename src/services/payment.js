import axios from 'axios'; 

const API_URL = 'http://localhost:3003/api/v1/payment/create_payment_url';

export const createPaymentUrl = async (amount, bankCode) => {
    try {
      const response = await axios.post(`${API_URL}`, {
        amount: amount,
        language: "vn"
      });
  
      if (response.data && response.data.paymentUrl) {
        // Redirect người dùng tới URL thanh toán
        window.location.href = response.data.paymentUrl;
      } else {
        console.error('Failed to get payment URL:', response.data);
      }
    } catch (error) {
      console.error('Error creating payment URL:', error);
    }
  };