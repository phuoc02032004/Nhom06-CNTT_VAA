import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./pages/home";
import LoginForm from "./pages/LoginPage";
import RegisterForm from "./pages/Register";
import ProductList from "./pages/product";
import ProductDetail from "./pages/DetailProduct"
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/payment";

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
          <Route path="ProductDetail" element={<ProductDetail/>} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
