// src/components/Layout.js
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({ onLoginClick }) => {
  return (
    <>
      <Header onLoginClick={onLoginClick} />
      <main style={{ paddingTop: "70px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
