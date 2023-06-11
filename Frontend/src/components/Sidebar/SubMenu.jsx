import React, { useState } from "react";
import { IoIosArrowDown, IoIosSchool } from "react-icons/io";
import { FaSchool } from "react-icons/fa";

import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const SubMenu = ({ menu1, menu2 }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <div>
      <li
        className={`link ${pathname.includes(menu1) && "text-blue-600"} ${
          pathname.includes(menu2) && "text-blue-600"
        }`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <FaSchool size={23} className="min-w-max" />
        <p className="capitalize flex-1">School Database</p>
        <IoIosArrowDown
          className={`${subMenuOpen && "rotate-180"} duration-200`}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="pl-12 text-[0.8rem] overflow-hidden font-normal
      h-0"
      >
        {/* {data.menus.map((menu) => (
          <li key={menu}>
            <NavLink
              to={`/${data.name}/${menu}`}
              className="link !bg-transparent capitalize"
            >
              {menu}
            </NavLink>
          </li>
        ))} */}
        <li>
          <NavLink
            to={`/${menu1}`}
            className={"link !bg-transparent capitalize"}
          >
            {menu1}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${menu2}`}
            className={"link !bg-transparent capitalize"}
          >
            {menu2}
          </NavLink>
        </li>
      </motion.ul>
    </div>
  );
};

export default SubMenu;
