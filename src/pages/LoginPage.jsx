import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import log from "../assets/log.png";

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

const LoginFormSection = ({ onRegisterNavigate }) => (
  <div className="w-full max-w-md">
    <h2 className="text-2xl font-semibold text-brown-900 mb-4">
      Đăng nhập tài khoản
    </h2>
    <p className="text-brown-700 mb-6">
      Nếu bạn đã có tài khoản, đăng nhập tại đây.
    </p>
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <InputField label="Email" type="email" placeholder="Email" />
      <InputField label="Mật khẩu" type="password" placeholder="Mật khẩu" />
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="bg-[#2c1200] text-white px-6 py-2 rounded-md hover:bg-brown-900"
        >
          Đăng nhập
        </button>
        <span
          onClick={onRegisterNavigate}
          className="text-brown-800 cursor-pointer hover:underline"
        >
          Đăng ký
        </span>
      </div>
    </form>
  </div>
);

const ForgotPasswordForm = () => (
  <div className="w-full max-w-md">
    <h2 className="text-2xl font-semibold text-brown-900 mb-4">
      Bạn quên mật khẩu?
    </h2>
    <p className="text-brown-700 mb-6">
      Nhập địa chỉ email để lấy lại mật khẩu qua email.
    </p>
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <InputField label="Email" type="email" placeholder="Email" />
      <button
        type="submit"
        className="bg-[#2c1200] text-white px-6 py-2 rounded-md hover:bg-brown-900"
      >
        Lấy lại mật khẩu
      </button>
    </form>
  </div>
);

function LoginForm() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto py-10">
      <img src={log} alt="log" className="mb-4" />

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-brown-800 mb-6">
        <FaHome className="text-lg" />
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer hover:underline"
        >
          Trang chủ
        </span>
        <span className="text-gray-500">/</span>
        <span className="font-semibold">Đăng nhập tài khoản</span>
      </div>

      <div className="flex justify-between items-start space-x-10">
        <LoginFormSection onRegisterNavigate={() => navigate("/register")} />
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

export default LoginForm;
