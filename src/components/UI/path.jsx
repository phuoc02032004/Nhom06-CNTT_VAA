import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PathName = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default PathName;
