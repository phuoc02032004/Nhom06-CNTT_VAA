import React, { Fragment } from "react";

import Header from "./header";
import Footer from "./footer";
import Routers from "../routers/router";
import Slider from "./UI/Slideshow2";
import Home from "../pages/home";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <Slider />
      <Home />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
