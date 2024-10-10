import React, { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";
import Slider from "./UI/Slideshow2";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <Fragment>
      <Header />
      {isHomePage && <Slider />}
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Layout;
