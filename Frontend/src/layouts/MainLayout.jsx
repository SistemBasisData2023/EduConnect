import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex gap-5 font-Montserrat">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
