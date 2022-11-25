import React from "react";
import NavBar from "../Pages/SharedPages/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/SharedPages/Footer";

const Root = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
