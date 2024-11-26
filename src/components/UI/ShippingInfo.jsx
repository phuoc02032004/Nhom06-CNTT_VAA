import React, { useState } from "react";

const ShippingInfo = ({ onSaveInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    shippingMethod: "delivery",
    province: "",
    district: "",
    ward: "",
    address: "",
  });

  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShippingMethod = (method) => {
    setFormData({
      ...formData,
      shippingMethod: method,
    });
  };

  const handleSubmit = () => {
  
    if (
      !formData.name ||
      !formData.phone ||
      !formData.province ||
      !formData.district ||
      !formData.ward ||
      !formData.address
    ) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

  
    onSaveInfo(formData);
    setError(""); 
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Thông tin người mua</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Họ và tên *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Số điện thoại *"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
      </div>

      <h3 className="text-xl font-bold mb-2">Hình thức nhận hàng</h3>
      <div className="flex space-x-4 mb-4">
        <button
          className={`p-2 rounded flex-grow ${formData.shippingMethod === 'delivery' ? 'bg-yellow-500' : 'bg-gray-300'}`}
          onClick={() => handleShippingMethod("delivery")}
        >
          Giao hàng tận nơi
        </button>
        <button
          className={`p-2 rounded flex-grow ${formData.shippingMethod === 'pickup' ? 'bg-purple-500' : 'bg-gray-300'}`}
          onClick={() => handleShippingMethod("pickup")}
        >
          Nhận tại cửa hàng
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Tỉnh/Thành *"
          name="province"
          value={formData.province}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Quận/Huyện *"
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phường/Xã *"
          name="ward"
          value={formData.ward}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Nhập địa chỉ khách hàng *"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
      </div>

      
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-3 rounded mt-4 hover:bg-blue-700"
      >
        Lưu thông tin
      </button>
    </div>
  );
};

export default ShippingInfo;
