import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout"; // Nhập Layout từ components
import Home from "./pages/home"; // Trang chủ
import LoginForm from "./pages/LoginPage"; // Trang đăng nhập
import RegisterForm from "./pages/Register"; // Trang đăng ký
import ProductList from "./pages/product"; // Danh sách sản phẩm
import Cart from "./pages/Cart"; // Giỏ hàng
import Checkout from "./pages/Checkout"; // Thanh toán
import Payment from "./pages/payment"; // Phương thức thanh toán
import PaymentMethods from "./pages/PaymentMethods"; // Phương thức thanh toán
import MeasureSize from "./pages/MeasureSize"; // Hướng dẫn đo size
import WarrantyAndCare from "./pages/WarrantyAndCare"; // Bảo hành và bảo quản
import DeliveryAndReturns from "./pages/DeliveryAndReturns"; // Giao hàng và đổi hàng
import DieuKienVIP from "./pages/DieuKienVIP"; // Nhập trang DieuKienVIP
import ProductDetail from "./pages/DetailProduct";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<ProductList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<Payment />} />
          <Route path="/hinh-thuc-thanh-toan" element={<PaymentMethods />} />
          <Route path="/huong-dan-do-size" element={<MeasureSize />} />
          <Route path="/bao-hanh-bao-quan" element={<WarrantyAndCare />} />
          <Route path="/giao-hang-doi-hang" element={<DeliveryAndReturns />} />
          <Route path="/dieu-kien-vip" element={<DieuKienVIP />} /> 
          <Route path="ProductDetail" element={<ProductDetail/>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />



        </Route>
      </Routes>
    </Router>
  );
}

export default App;
