import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  //   const currentPath = location.pathname.substring(1).toUpperCase();

  return (
    <div className="bg-white px-6 py-6 shadow-lg text-black font-medium z-[999]">
      <div className="flex justify-between bg-white ">
        <h2 className="font-semibold">Dashboard</h2>
        <h2>Welcome Back, RadityaDito</h2>
      </div>
    </div>
  );
};

export default Header;
