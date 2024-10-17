import React from "react";

const ShippingInfo = () => (
  <div>
    <h3 className="text-xl font-bold mb-2">Thông tin người mua</h3>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <input
        type="text"
        placeholder="Họ và tên *"
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Số điện thoại *"
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded col-span-2"
      />
      <input
        type="text"
        placeholder="Ngày sinh"
        className="border p-2 rounded col-span-2"
      />
    </div>
    <h3 className="text-xl font-bold mb-2">Hình thức nhận hàng</h3>
    <div className="flex space-x-4 mb-4">
      <button className="bg-yellow-500 text-white p-2 rounded flex-grow">
        Giao hàng tận nơi
      </button>
      <button className="bg-purple-500 text-white p-2 rounded flex-grow">
        Nhận tại cửa hàng
      </button>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <input
        type="text"
        placeholder="Tỉnh/Thành *"
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Quận/Huyện *"
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Phường/Xã *"
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Nhập địa chỉ khách hàng *"
        className="border p-2 rounded col-span-2"
      />
    </div>
  </div>
);

export default ShippingInfo;
