import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../../assets/LogoImage.png";
// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import SubMenu from "./SubMenu";
import { MdMenu } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

const Sidebar = ({ isOpen, setIsOpen }) => {
  let isTab = useMediaQuery({ query: "(max-width: 1100px)" });
  const { pathname } = useLocation();

  const subMenusList = [
    {
      name: "build",
      icon: RiBuilding3Line,
      menus: ["auth", "app settings", "storage", "hosting"],
    },
    {
      name: "analytics",
      icon: TbReportAnalytics,
      menus: ["dashboard", "realtime", "events"],
    },
  ];

  const Sidebar_animation = isTab
    ? {
        //Mobile
        open: {
          width: "16rem",
          x: 0,
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: 0,
          x: -200,
          transition: {
            damping: 40,
          },
        },
      }
    : {
        //System View
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab]);

  //Page changes => Close Sidebar (Only Mobile)
  useEffect(() => {
    isTab && setIsOpen(false);
  }, [pathname]);

  //Sidebar Open State
  // const [isOpen, setIsOpen] = useState(); //Istab True open bakal selalu false
  return (
    <div className="">
      <div
        className={`fixed inset-0 bg-black/50 z-[900] max-h-screen lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <motion.div
        variants={Sidebar_animation}
        initial={{ x: isTab ? -250 : 0 }}
        animate={isOpen ? "open" : "closed"}
        className="bg-white text-black shadow-lg z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden  lg:relative fixed"
      >
        {/* logo */}
        <div className="flex items-center gap-2.5 font-medium border-b border-slate-300 py-3 my-1 mx-3 cursor-pointer">
          <img src={Logo} alt="Icon" width={45} />
          <span className="text-xl whitespace-pre ">EduConnect</span>
        </div>

        {/* Menu */}
        <div className="flex flex-col h-full ">
          <ul className="whitespace-pre px-2.5 py-5 font-medium overflow-x-hidden flex flex-col gap-1 text-[0.9rem] scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100  md:h-[68%] h-[70%]">
            <li>
              <NavLink
                className="flex items-center gap-6 p-2.5 rounded-md md:cursor-pointer cursor-default duration-300 font-medium "
                to="/dashboard"
              >
                <AiOutlineAppstore size={23} className="min-w-max" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className={"link"} to="/student">
                <BsPerson size={23} className="min-w-max" />
                Student
              </NavLink>
            </li>
            <li>
              <NavLink to={"/teacher"} className="link">
                <HiOutlineDatabase size={23} className="min-w-max" />
                Teacher
              </NavLink>
            </li>

            {/* submenu */}
            {(isOpen || isTab) && (
              <div className="border-y py-5 border-slate-300">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Product Category
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}

            <li>
              <NavLink to={"/resource"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Resource
              </NavLink>
            </li>
            <li>
              <NavLink to={"/subject"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Courses
              </NavLink>
            </li>
          </ul>
          {/* Spark */}
          {isOpen && (
            <div className="flex-1 z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
              <div className="flex p-4 items-center justify-between border-y py-5 border-slate-300">
                <div className="">
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 hover:bg-teal-200 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Sidebar Button */}
        <motion.div
          animate={
            isOpen
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{
            duration: 0,
          }}
          onClick={() => setIsOpen(!isOpen)}
          className="absolute z-50 bottom-5 right-2 cursor-pointer bg-slate-200 p-1 rounded-full md:block hidden"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div
        className="m-3 lg:hidden absolute bottom-0"
        onClick={() => setIsOpen(true)}
      >
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
