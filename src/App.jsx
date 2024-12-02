import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import DefaultLayout from './layout/DefaultLayout';
import Category from './pages/Category';
import Order from './pages/Order';
import Productt from './pages/Product';
import User from './pages/User';
import { jwtDecode } from "jwt-decode";

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTimeout(() => setLoading(false), 1000);

    if (!token) {
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role !== "admin") {
          navigate("/login");
        }
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  return loading ? (
    <Loader />
  ) : (

    <Routes>
      <Route
        path="/login"
        element={
          <>
            <SignIn />
          </>
        }
      />
      <Route
        path='/'
        element={
          <>
            <DefaultLayout>
              <Category />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/category"
        element={
          <>
            <DefaultLayout>
              <Category />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/product"
        element={
          <>
            <DefaultLayout>
              <Productt />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/user"
        element={
          <>
            <DefaultLayout>
              <User />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/order"
        element={
          <>
            <DefaultLayout>
              <Order />
            </DefaultLayout>
          </>
        }
      />
    </Routes>
  );
}

export default App;
