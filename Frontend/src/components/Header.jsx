import { Typography } from "@material-tailwind/react";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { UserContext } from "../components/Context/UserContext";
import { useContext } from "react";
import LoadingPage from "../pages/LoadingPage";

const Header = ({ setIsOpen }) => {
  const { user, logout } = useContext(UserContext);

  const location = useLocation();
  //   const currentPath = location.pathname.substring(1).toUpperCase();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleClick = () => {
    setProfileOpen(!profileOpen);
  };

  function extractLinkSegment(link) {
    const segments = link.split("/");
    if (segments.length >= 2) {
      const extractedSegment = segments[1];
      return (
        extractedSegment.charAt(0).toUpperCase() + extractedSegment.slice(1)
      );
    }
    return "";
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    if (name.includes(" ")) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    } else {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: name[0],
      };
    }
  }

  // if (!user) {
  //   return Navigate("/login");
  // }

  return (
    <div className="relative">
      <div className="bg-[#F8F9FF] md:px-10 px-5 py-1 shadow-lg text-black font-medium z-[999]">
        <div className="flex justify-between  items-center">
          <div className="flex gap-3 justify-center items-center p">
            <MdMenu
              size={30}
              className="transition-transform duration-300 transform hover:scale-110 lg:hidden"
              onClick={() => setIsOpen(true)}
            />
            <h2 className="font-semibold">
              {extractLinkSegment(location.pathname)}
            </h2>
          </div>

          {/* <h2>Welcome Back, RadityaDito</h2> */}
          {/* <div className="flex items-center gap-3">
          <Avatar {...stringAvatar("Raditya Dito")} />
          <div>
            <Typography variant="h6">Raditya Dito</Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Student
            </Typography>
          </div>
        </div> */}

          <div
            className={`flex items-center space-x-2 cursor-pointer p-2 hover:bg-blue-gray-50 ease-in-out duration-500 rounded-lg`}
            onClick={() => handleClick()}
          >
            <Avatar {...stringAvatar(user?.name || "Raditya Dito")} />
            <div className="font-medium dark:text-white">
              <div>{user ? user.name : "RadityaDito"}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {user ? user.role : "Development"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -1000 }}
        animate={{ opacity: profileOpen ? 1 : 0, y: profileOpen ? 0 : -1000 }}
        transition={{ duration: 0.5 }}
        className={`absolute z-10 right-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 `}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white ">
          <div>{user ? user.name : "RadityaDito"}</div>
          <div className="font-medium truncate">
            {user ? user.role : "Development"}
          </div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          <li>
            <Link
              to={"/dashboard"}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-1 cursor-pointer" onClick={() => logout()}>
          <p
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
