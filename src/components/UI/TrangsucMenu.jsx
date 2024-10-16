import React from "react";

const DropdownMenu = () => {
  return (
    <div className="absolute left-0 mt-2 bg-white shadow-lg w-[800px] border border-gray-200 z-50">
      <div className="grid grid-cols-4 gap-8 p-6 text-left">
        <div className="border-r border-gray-300 pr-4">
          <h4 className="font-bold text-[#6b4226] text-sm">WHAT'S NEW</h4>
          <ul className="mt-2 text-[#6b4226] text-sm">
            <li className="mt-1">New Collections</li>
            <li className="mt-1">Hàng Bán Chạy</li>
            <li className="mt-1">Promotion</li>
          </ul>
        </div>

        <div className="border-r border-gray-300 pr-4">
          <h4 className="font-bold text-[#6b4226] text-sm">NHẪN BẠC</h4>
          <ul className="mt-2 text-[#6b4226] text-sm">
            <li className="mt-1">Nhẫn Bạc Midi</li>
            <li className="mt-1">Nhẫn Cổ Lớn</li>
            <li className="mt-1">Nhẫn Ngón Út</li>
            <li className="mt-1">Nhẫn Xoay</li>
            <li className="mt-1">Nhẫn Đá</li>
            <li className="mt-1">Nhẫn Nam</li>
          </ul>
        </div>

        <div className="border-r border-gray-300 pr-4">
          <h4 className="font-bold text-[#6b4226] text-sm">BÔNG TAI BẠC</h4>
          <ul className="mt-2 text-[#6b4226] text-sm">
            <li className="mt-1">Bông Bạc Xỏ Lỗ</li>
            <li className="mt-1">Bông Bạc Treo</li>
            <li className="mt-1">Khuyên Vành Tai</li>
            <li className="mt-1">Bông Tai Jacket</li>
            <li className="mt-1">Bông Tai Leo</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#6b4226] text-sm">DÂY CHUYỀN BẠC</h4>
          <ul className="mt-2 text-[#6b4226] text-sm">
            <li className="mt-1">Dây Chuyền Bán Kèm Dây</li>
            <li className="mt-1">Mặt Dây Bạc (Giá chưa tính dây)</li>
            <li className="mt-1">Mặt Đá (Giá chưa tính dây)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
