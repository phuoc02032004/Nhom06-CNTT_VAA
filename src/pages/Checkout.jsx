import React, { useState, useEffect } from "react";
import CartItem from "../components/UI/Product_in_cart";
import ShippingInfo from "../components/UI/ShippingInfo";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [], totalPrice: 0 };


  console.log("Selected Items:", selectedItems)

  sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));

  const [storedTotalPrice, setStoredTotalPrice] = useState(0);
  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    const totalPrice = sessionStorage.getItem("totalPrice");
    if (totalPrice) {
      setStoredTotalPrice(Number(totalPrice));  
    }
  }, []);

  useEffect(() => {
    const savedShippingInfo = sessionStorage.getItem("shippingInfo");
    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo)); 
    }
  }, []);

  const proceedToPayment = () => {

    if (!shippingInfo) {
      alert("Vui lòng lưu thông tin giao hàng trước khi tiếp tục.");
      return;
    }

    sessionStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    navigate("/payment", { state: { totalPrice: storedTotalPrice } });
  };

  const handleSaveShippingInfo = (info) => {

    setShippingInfo(info);
    sessionStorage.setItem("shippingInfo", JSON.stringify(info));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <Link to="/cart" className="text-blue-500 mb-4 flex items-center">
        &larr; Quay lại giỏ hàng
      </Link>

      <h2 className="text-2xl font-bold text-center mb-4">Tóm tắt đơn hàng</h2>


      <div className="border-b pb-4 mb-4">
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <CartItem key={item.id} item={item} isSummary={true} />
          ))
        ) : (
          <p>Chưa có sản phẩm nào được chọn</p>
        )}
      </div>

      <div className="text-right text-lg font-semibold mb-4">
        <p>Tạm tính: {storedTotalPrice.toLocaleString()} ₫</p>
        <p>Giao hàng: Miễn phí</p>
        <p>Giảm giá: - 0 ₫</p>
        <p className="font-bold">Tổng tiền: {storedTotalPrice.toLocaleString()} ₫</p>
      </div>

      <ShippingInfo onSaveInfo={handleSaveShippingInfo} />

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
