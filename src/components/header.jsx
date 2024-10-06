import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import DropdownMenu from "./UI/TrangsucMenu";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <header className="border-b border-gray-300 py-4 relative z-50">
      <div className="flex justify-between items-center px-10 py-2">
        <div className="flex items-center space-x-6">
          <Link to="#" className="text-gray-700">
            <i className="ri-facebook-fill text-2xl"></i>
          </Link>
          <Link to="#" className="text-gray-700">
            <i className="ri-instagram-fill text-2xl"></i>
          </Link>
        </div>

        <div className="text-center">
          <Link to="/">
            <img src={logo} alt="Kat Jewelry Logo" className="h-12" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <i className="ri-search-line text-brown-600 text-2xl"></i>
          <div
            className="relative"
            onMouseEnter={toggleAccountMenu}
            onMouseLeave={() =>
              setTimeout(() => setIsAccountMenuOpen(false), 5000)
            }
          >
            <i className="ri-user-line text-brown-600 text-2xl cursor-pointer"></i>

            {isAccountMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg w-40 p-3 z-50">
                <ul>
                  <li className="flex items-center space-x-2 text-gray-600 hover:text-black">
                    <i className="ri-lock-line"></i>
                    <Link to="/register">Đăng ký</Link>
                  </li>
                  <li className="flex items-center space-x-2 mt-2 text-gray-600 hover:text-black">
                    <i className="ri-user-line"></i>
                    <Link to="/login">Đăng nhập</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="bg-white">
        <ul className="flex justify-center space-x-8 text-lg font-semibold">
          <li>
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              TRANG CHỦ
            </Link>
          </li>
          <li
            className="relative"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <button className="text-gray-800 hover:text-gray-600">
              TRANG SỨC
              <span className="ml-1">&#9662;</span>
            </button>

            {isDropdownOpen && <DropdownMenu />}
          </li>

          <li>
            <Link
              to="/collection"
              className="text-gray-800 hover:text-gray-600"
            >
              BỘ SƯU TẬP
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="text-gray-800 hover:text-gray-600">
              BÀI VIẾT
            </Link>
          </li>
          <li>
            <Link to="/info" className="text-gray-800 hover:text-gray-600">
              THÔNG TIN
            </Link>
          </li>

          <li>
            <Link to="/contact" className="text-gray-800 hover:text-gray-600">
              LIÊN HỆ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
