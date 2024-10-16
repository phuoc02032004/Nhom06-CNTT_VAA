import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./pages/home";
import LoginForm from "./pages/LoginPage";
import RegisterForm from "./pages/Register";
import ProductList from "./pages/product";
import Cart from "./pages/Cart";
import MeasureSize from './pages/MeasureSize'; 
import WarrantyAndCare from './pages/WarrantyAndCare'; 
import DeliveryAndReturns from './pages/DeliveryAndReturns'; 



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
          <Route path="/measure-size" element={<MeasureSize />} />
          <Route path="/warranty-and-care" component={<WarrantyAndCare />} />
          <Route path="/delivery-and-returns" component={<DeliveryAndReturns/>} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
