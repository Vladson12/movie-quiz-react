import React from "react";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  return (
    <div className="App">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
