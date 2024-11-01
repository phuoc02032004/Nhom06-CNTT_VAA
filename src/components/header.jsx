import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import DropdownMenu from "./UI/TrangsucMenu";
import { FaOpencart } from "react-icons/fa";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimeoutRef = useRef(null);

  const toggleMenu = (menuName) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 500);
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
          <Link to="/cart">
            <FaOpencart className="text-brown-600 text-2xl cursor-pointer" />
          </Link>

          <i className="ri-search-line text-brown-600 text-2xl"></i>
          <div
            className="relative"
            onMouseEnter={() => toggleMenu("account")}
            onMouseLeave={handleMouseLeave}
          >
            <i className="ri-user-line text-brown-600 text-2xl cursor-pointer"></i>

            {openMenu === "account" && (
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

          <li className="relative">
            <div
              onMouseEnter={() => toggleMenu("trangsuc")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-gray-800 hover:text-gray-600">
                <Link
                  to="/product"
                  className="text-gray-800 hover:text-gray-600"
                >
                  TRANG SỨC
                </Link>
                <span className="ml-1">&#9662;</span>
              </button>

              {openMenu === "trangsuc" && (
                <div className="absolute z-50 bg-white shadow-lg p-3">
                  <DropdownMenu />
                </div>
              )}
            </div>
          </li>

          {/* Dropdown "Bài Viết" */}
          <li className="relative">
            <div
              onMouseEnter={() => toggleMenu("baiviet")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-gray-800 hover:text-gray-600">
                BÀI VIẾT
                <span className="ml-1">&#9662;</span>
              </button>

              {openMenu === "baiviet" && (
                <div
                  className="absolute z-50 bg-white shadow-lg p-3"
                  style={{ minWidth: "150px" }}
                >
                  <ul className="text-brown-600">
                    <li className=" pr-4 font-bold text-[#6b4226]  ">
                      <Link to="/tin-tuc">Tin Tức</Link>
                    </li>
                    <li className="pr-4 font-bold text-[#6b4226] ">
                      <Link to="/su-kien">Sự Kiện</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </li>

          <li>
            <Link
              to="/collection"
              className="text-gray-800 hover:text-gray-600"
            >
              BỘ SƯU TẬP
            </Link>
          </li>

          <li className="relative">
            <div
              onMouseEnter={() => toggleMenu("thongtin")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-gray-800 hover:text-gray-600">
                THÔNG TIN
                <span className="ml-1">&#9662;</span>
              </button>

              {openMenu === "thongtin" && (
                <div
                  className="absolute z-45 bg-white shadow-lg p-3"
                  style={{ minWidth: "270px" }}
                >
                  <ul className="text-brown-600">
                    <li className="pr-4 font-bold text-[#6b4226] ">
                      <Link to="/huong-dan-do-size">HƯỚNG DẪN ĐO SIZE</Link>
                    </li>
                    <li> </li>
                    <li className="pr-4 font-bold text-[#6b4226] ">
                      <Link to="/bao-hanh-bao-quan">BẢO HÀNH & BẢO QUẢN</Link>
                    </li>
                    <li> </li>
                    <li className="pr-4 font-bold text-[#6b4226] ">
                      <Link to="/giao-hang-doi-hang">GIAO HÀNG & ĐỔI HÀNG</Link>
                    </li>
                    <li> </li>
                    <li className="pr-4 font-bold text-[#6b4226] ">
                      <Link to="/hinh-thuc-thanh-toan">
                        HÌNH THỨC THANH TOÁN
                      </Link>
                    </li>
                    <li> </li>
                    <li className="pr-4 font-bold text-[#6b4226] ">
                      <Link to="/dieu-kien-vip">ĐIỀU KIỆN VIP</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </li>

          <li>
            <Link to="/contact" className="text-gray-800 hover:text-gray-600">
              LIÊN HỆ
              <span className="ml-1">&#9662;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
