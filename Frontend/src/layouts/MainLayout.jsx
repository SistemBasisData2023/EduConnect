import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex  font-Montserrat">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="w-full bg-[#F8F9FF]">
          <Header setIsOpen={setIsOpen} />
          <Outlet />
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
