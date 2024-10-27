import React, { useState } from "react";
import { verify } from "../services/user"; // Import hàm verify từ services
import { useNavigate } from "react-router-dom";

function VerifyForm({ onVerified }) {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    const email = ""; // Lấy email từ trạng thái hoặc props nếu cần
    try {
      const response = await verify(email, verificationCode);
      if (response.status === 200) {
        onVerified(); // Gọi hàm callback khi xác minh thành công
      } else {
        setError("Mã xác minh không hợp lệ. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi xác minh:", error);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Nhập mã xác minh"
        required
        className="border border-gray-300 p-3 rounded-md w-full mb-4"
      />
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <button type="submit" className="bg-[#2c1200] text-white px-6 py-2 rounded-md hover:bg-brown-900">
        Xác minh
      </button>
    </form>
  );
}

export default VerifyForm;
