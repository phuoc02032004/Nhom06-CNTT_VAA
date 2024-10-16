import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import log from "../assets/log.png";

// Component Input Field
const InputField = ({ label, type, placeholder }) => (
  <div>
    <label className="block text-brown-900 font-medium mb-1">
      {label} <span className="text-red-600">*</span>
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-brown-600"
      required
    />
  </div>
);

function RegisterForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <img src={log} alt="log" className="mb-4" />

      <div className="flex items-center space-x-2 text-brown-800 mb-6">
        <FaHome className="text-lg" />
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer hover:underline"
        >
          Trang chủ
        </span>
        <span className="text-gray-500">/</span>
        <span className="font-semibold">Đăng ký tài khoản</span>
      </div>

      {/* Tiêu đề và hướng dẫn */}
      <h2 className="text-2xl font-semibold text-brown-900 mb-4">
        Đăng ký tài khoản
      </h2>
      <p className="text-brown-700 mb-6">
        Nếu chưa có tài khoản vui lòng đăng ký tại đây
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <InputField label="Họ" type="text" placeholder="Họ" />
        <InputField label="Tên" type="text" placeholder="Tên" />
        <InputField label="Email" type="email" placeholder="Email" />
        <InputField label="Mật khẩu" type="password" placeholder="Mật khẩu" />

        {/* Nút đăng ký và liên kết đăng nhập */}
        <div className="col-span-2 flex items-center space-x-4">
          <button
            type="submit"
            className="bg-[#2c1200] text-white px-6 py-2 rounded-md hover:bg-brown-900"
          >
            Đăng ký
          </button>
          <span
            onClick={() => navigate("/login")}
            className="text-brown-800 cursor-pointer hover:underline"
          >
            Đăng nhập
          </span>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
