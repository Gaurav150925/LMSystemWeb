// src/components/Layout.jsx
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import AppSidebar from "./Sidebar/AppSidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <AppSidebar />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
