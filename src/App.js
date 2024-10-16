import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./pages/home";
import LoginForm from "./pages/LoginPage";
import RegisterForm from "./pages/Register";
import ProductList from "./pages/product";
import Cart from "./pages/Cart";
<<<<<<< HEAD
import MeasureSize from './pages/MeasureSize'; 
import WarrantyAndCare from './pages/WarrantyAndCare'; 
import DeliveryAndReturns from './pages/DeliveryAndReturns'; 


=======
>>>>>>> 02e3e5fc85567f1b0acf9d7d88f577a3d244a28c

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<ProductList />} />
<<<<<<< HEAD
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="/measure-size" element={<MeasureSize />} />
          <Route path="/warranty-and-care" component={<WarrantyAndCare />} />
          <Route path="/delivery-and-returns" component={<DeliveryAndReturns/>} />


=======
          <Route path="cart" element={<ProductList />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
>>>>>>> 02e3e5fc85567f1b0acf9d7d88f577a3d244a28c
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
