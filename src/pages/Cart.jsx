import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/UI/Product_in_cart";
import A1 from "../assets/sp1.webp";
import A2 from "../assets/sp2.webp";
import A3 from "../assets/sp3.webp";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nhẫn Vàng trắng 10K đính đá ECZ PNJ",
      code: "GNXMXMW000205",
      price: 5071000,
      quantity: 1,
      image: A1,
      selected: false,
    },
    {
      id: 2,
      name: "Bông tai Kim cương Vàng trắng 14K PNJ",
      code: "GBDDDDW000176",
      price: 43236000,
      quantity: 1,
      image: A2,
      selected: false,
    },
    {
      id: 3,
      name: "Mặt dây chuyền Vàng trắng Ý 18K PNJ",
      code: "GM0000W001171",
      price: 4037000,
      quantity: 1,
      image: A3,
      selected: false,
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleSizeChange = (id, size) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, size } : item))
    );
  };

  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems((items) =>
      items.map((item) => ({ ...item, selected: newSelectAll }))
    );
  };

  const handleSelectItem = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const totalPrice = cartItems
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0);

  // Hàm chuyển sang trang thanh toán
  const handleProceedToPayment = () => {
    navigate("/checkout");
  };

  return (
    <div className="w-3/4 mx-auto bg-white shadow-md rounded-lg p-4">
      <Link to="/" className="text-blue-500 mb-2 flex items-center">
        &larr; Quay lại
      </Link>
      <h2 className="text-xl font-bold text-center p-4">Giỏ Hàng</h2>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          className="form-checkbox h-5 w-5 text-gray-600"
        />
        <p className="ml-2 text-gray-700">
          Tất cả ({cartItems.length} sản phẩm)
        </p>
      </div>

      <div className="divide-y">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onSizeChange={handleSizeChange}
            onRemove={handleRemove}
            onSelect={handleSelectItem}
          />
        ))}
      </div>

      <div className="p-4 text-right text-gray-700">
        <p>Tạm tính: {totalPrice.toLocaleString()} ₫</p>
        <p>Giảm giá: - 0 ₫</p>
        <p className="font-bold">Tổng tiền: {totalPrice.toLocaleString()} ₫</p>
        <p className="text-sm text-gray-500">(Giá tham khảo đã bao gồm VAT)</p>
      </div>

      {/* Div bọc bên ngoài để căn giữa */}
      <div className="flex justify-center">
        <button
          onClick={handleProceedToPayment}
          className="w-3/4 bg-[#2c1409] text-white py-2 rounded-lg mt-4 hover:bg-blue-700"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default Cart;
