
import PaymentInfo from "../components/UI/PaymentInfo"; // Để chọn phương thức thanh toán
import { Link, useLocation } from "react-router-dom";
import { createPaymentUrl } from "../services/payment"

import React, { useState } from "react";

const Payment = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const paymentUrl = await createPaymentUrl(totalPrice);
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert('Không thể tạo URL thanh toán. Vui lòng thử lại.');
      }
    } catch (error) {
      alert('Đã xảy ra lỗi khi xử lý thanh toán. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <Link to="/checkout" className="text-blue-500 mb-4 flex items-center">
        &larr; Quay lại
      </Link>
      <h2 className="text-2xl font-bold text-center mb-4">Thanh toán</h2>
      <div className="text-right text-lg font-semibold my-4">
        <p>Tổng tiền: {totalPrice.toLocaleString()} ₫</p>
      </div>
      <PaymentInfo />
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`w-full py-3 rounded mt-4 ${
          isLoading ? 'bg-gray-400' : 'bg-[#2c1409] hover:bg-blue-700 text-white'
        }`}
      >
        {isLoading ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
      </button>
    </div>
  );
};

export default Payment;
