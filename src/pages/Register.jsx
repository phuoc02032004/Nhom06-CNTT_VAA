import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import log from "../assets/log.png";
import { registerUser, verify } from "../services/user";
import PathName from "../components/UI/path";

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

  // Hàm xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu
    const confirmPassword = e.target[3].value;
    if (password !== confirmPassword) {
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

      if (response.status === 200 || response.status === 201) {
        setIsRegistered(true); // Đăng ký thành công
        setError(""); // Xóa thông báo lỗi
      } else {
        setError(
          response.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
        );
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
      setError(
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
    }
  };

  // Hàm xử lý xác minh
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!verificationCode.trim()) {
      setError("Vui lòng nhập mã xác minh.");
      return;
    }

    try {
      const response = await verify(email, verificationCode);

      if (response.status === 200) {
        navigate("/login");
      } else {
        setError(
          response.data?.message ||
            "Mã xác minh không hợp lệ. Vui lòng thử lại."
        );
      }
    } catch (error) {
      console.error("Lỗi xác minh:", error);
      setError(
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <img src={log} alt="log" className="mb-4" />
      <div>
        <PathName
          paths={[
            { label: "Trang chủ", onClick: (navigate) => navigate("/") },

            { label: "Đăng ký", active: true },
          ]}
        />
      </div>
      <h2 className="text-2xl font-semibold text-brown-900 mb-4">
        Đăng ký tài khoản
      </h2>
      <p className="text-brown-700 mb-6">
        Nếu chưa có tài khoản vui lòng đăng ký tại đây
      </p>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {isRegistered ? (
        <>
          <p className="text-green-600 mb-4">
            Đăng ký thành công! Vui lòng kiểm tra email để nhận mã xác minh.
          </p>
          <form onSubmit={handleVerify}>
            <InputField
              label="Mã xác minh"
              type="text"
              placeholder="Nhập mã xác minh"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <div className="col-span-2 flex items-center space-x-4 mt-4">
              <button
                type="submit"
                className="bg-[#2c1200] text-white px-6 py-2 rounded-md hover:bg-brown-900"
              >
                Xác minh
              </button>
            </div>
          </form>
        </>
      ) : (
        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-6">
          <InputField
            label="Họ và Tên"
            type="text"
            placeholder="Họ và Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Mật khẩu"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            label="Nhập lại mật khẩu"
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
          <div className="col-span-2 flex items-center space-x-4 mt-4">
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
      )}
    </div>
  );
}

export default RegisterForm;
