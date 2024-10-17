import React from "react";
import PaymentInfo from "../components/UI/PaymentInfo"; // Để chọn phương thức thanh toán
import { Link, useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy giá trị `totalPrice` từ `Checkout`
  const totalPrice = location.state?.totalPrice || 0;

  const handlePaymentConfirmation = () => {
    // Xử lý logic thanh toán ở đây, ví dụ như gửi dữ liệu đến API
    console.log("Thanh toán thành công");

    // Điều hướng đến trang xác nhận thanh toán hoặc trang cảm ơn
    navigate("/confirmation");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <Link to="/checkout" className="text-blue-500 mb-4 flex items-center">
        &larr; Quay lại
      </Link>

      <h2 className="text-2xl font-bold text-center mb-4">Thanh toán</h2>

      {/* Tổng cộng */}
      <div className="text-right text-lg font-semibold my-4">
        <p>Tổng tiền: {totalPrice.toLocaleString()} ₫</p>
      </div>

      {/* Phương thức thanh toán */}
      <PaymentInfo />

      <button
        onClick={handlePaymentConfirmation}
        className="w-full bg-[#2c1409] text-white py-3 rounded mt-4 hover:bg-blue-700"
      >
        Xác nhận thanh toán
      </button>
    </div>
  );
};

export default Payment;
