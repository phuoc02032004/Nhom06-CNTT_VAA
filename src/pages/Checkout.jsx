import React, { useState } from "react";
import CartItem from "../components/UI/Product_in_cart";
import ShippingInfo from "../components/UI/ShippingInfo";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems] = useState([
    {
      id: 1,
      name: "Nhẫn Vàng trắng 10K đính đá ECZ PNJ",
      code: "GNXMXMW000205",
      price: 5071000,
      quantity: 1,
      image: "/ring.jpg",
      selected: true,
    },
  ]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const proceedToPayment = () => {
    navigate("/payment", { state: { totalPrice } });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <Link to="/cart" className="text-blue-500 mb-4 flex items-center">
        &larr; Quay lại giỏ hàng
      </Link>

      <h2 className="text-2xl font-bold text-center mb-4">Tóm tắt đơn hàng</h2>

      {/* Hiển thị sản phẩm tóm tắt */}
      <div className="border-b pb-4 mb-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} isSummary={true} />
        ))}
      </div>

      <div className="text-right text-lg font-semibold mb-4">
        <p>Tạm tính: {totalPrice.toLocaleString()} ₫</p>
        <p>Giao hàng: Miễn phí</p>
        <p>Giảm giá: - 0 ₫</p>
        <p className="font-bold">Tổng tiền: {totalPrice.toLocaleString()} ₫</p>
      </div>

      <ShippingInfo />

      <button
        onClick={proceedToPayment}
        className="w-full bg-[#2c1409] text-white py-3 rounded mt-4 hover:bg-blue-700"
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default Checkout;
