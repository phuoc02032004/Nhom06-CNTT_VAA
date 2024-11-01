// Cart.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/UI/Product_in_cart";
import { getCartItems, removeCartItem } from "../services/cart";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); 
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carts = await getCartItems();
        const items = carts.flatMap(cart =>
          cart.products.map(product => ({
            id: product._id,
            name: product.name,
            code: product._id, 
            price: product.price,
            quantity: product.quantity,
            image: product.images[0].url,
            selected: false,
          }))
        );
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchData();
  }, []); 

  const handleQuantityChange = (id, quantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);
      setCartItems((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
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

  const handleProceedToPayment = () => {
    navigate("/checkout");
  };

  return (
    <div className="w-3/4 mx-auto bg-white shadow-md rounded-lg p-4">
      <Link to="/" className="text-blue-500 mb-2 flex items-center">
        ← Quay lại
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
            onRemove={() => handleRemove(item.id)}
            onSelect={() => handleSelectItem(item.id)} 
          />
        ))}
      </div>

      <div className="p-4 text-right text-gray-700">
        <p>Tạm tính: {totalPrice.toLocaleString()} ₫</p>
        <p>Giảm giá: - 0 ₫</p>
        <p className="font-bold">Tổng tiền: {totalPrice.toLocaleString()} ₫</p>
        <p className="text-sm text-gray-500">(Giá tham khảo đã bao gồm VAT)</p>
      </div>

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
