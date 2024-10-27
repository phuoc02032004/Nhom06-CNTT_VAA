import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import log from "../assets/log.png";
import { registerUser, verify } from "../services/user";

const InputField = ({ label, type, placeholder, value, onChange }) => (
  <div>
    <label className="block text-brown-900 font-medium mb-1">
      {label} <span className="text-red-600">*</span>
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-brown-600"
      required
    />
  </div>
);

function RegisterForm() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== e.target[3].value) {
      setError("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
      return;
    } else {
      setError("");
    }

    const formData = {
      name,
      email,
      password,
    };

    try {
      const response = await registerUser(formData);
      if (response.status === 200) {
        setIsRegistered(true);
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await verify(email, password, verificationCode);
      if (response.status === 200) {
        navigate("/login");
      } else {
        setError("Mã xác minh không hợp lệ. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi xác minh:", error);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <img src={log} alt="log" className="mb-4" />
      <div className="flex items-center space-x-2 text-brown-800 mb-6">
        <FaHome className="text-lg" />
        <span onClick={() => navigate("/")} className="cursor-pointer hover:underline">
          Trang chủ
        </span>
        <span className="text-gray-500">/</span>
        <span className="font-semibold">Đăng ký tài khoản</span>
      </div>
      <h2 className="text-2xl font-semibold text-brown-900 mb-4">Đăng ký tài khoản</h2>
      <p className="text-brown-700 mb-6">Nếu chưa có tài khoản vui lòng đăng ký tại đây</p>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      {isRegistered ? (
        <form onSubmit={handleVerify}>
          <InputField
            label="Mã xác minh"
            type="text"
            placeholder="Nhập mã xác minh"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <div className="col-span-2 flex items-center space-x-4">
            <button
              type="submit"
              className="bg-[#2c1200] text-white px-6 py-2 rounded-md hover:bg-brown-900"
            >
              Xác minh
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-6">
          <InputField label="Họ và Tên" type="text" placeholder="Họ và Tên" value={name} onChange={(e) => setName(e.target.value)} />
          <InputField label="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Mật khẩu" type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputField
            label="Nhập lại mật khẩu"
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="col-span-2 flex items-center space-x-4">
            <button
              type="submit"
              className="bg-[#2c1200] text-white px-6 py-2 rounded-md hover:bg-brown-900"
            >
              Đăng ký
            </button>
            <span onClick={() => navigate("/login")} className="text-brown-800 cursor-pointer hover:underline">
              Đăng nhập
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;
