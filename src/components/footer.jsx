import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-footer.webp";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-[#2c1409] text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          <div className="mb-6 md:mb-0">
            <Link to="/">
              <img src={logo} alt="Kat Jewelry Logo" className="h-12" />
            </Link>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4">Đăng ký tư vấn</h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="p-2 rounded-l bg-gray-800 border-none text-white"
              />
              <button className="bg-teal-500 px-4 py-2 rounded-r text-white">
                Gửi
              </button>
            </div>
          </div>
        </div>

        {/* Phần liên kết nhanh và thông tin liên hệ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <h5 className="text-lg font-semibold mb-4">Liên kết nhanh</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gray-400">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gray-400">
                  Cửa hàng
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-400">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4">Thông tin liên hệ</h5>
            <p> TP. Hồ Chí Minh</p>
            <p>SĐT: +84 999 999 999</p>
            <p>Email: skytua121@gmail.com</p>
          </div>

          {/* Thêm phần Địa chỉ cửa hàng */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Địa chỉ cửa hàng</h5>
            <ul className="space-y-2">
              <li>45 Hầm Bom, Quê Tôi</li>
              <li>450 Trần Duy Hưng, Hà Nội</li>
              <li>215 Phát SV, Kiên Giang</li>
              <li>213A Nguyễn Trãi, Quận 5</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-10 border-t border-gray-700 pt-6">
          <p className="text-gray-400">
            &copy; {year} Kat Jewelry. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
