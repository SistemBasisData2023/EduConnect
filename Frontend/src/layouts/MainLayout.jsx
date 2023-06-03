import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
      <div className="flex  font-Montserrat">
        <Sidebar />

        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
