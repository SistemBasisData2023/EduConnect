import React, { useState } from "react";
import Header from "../components/Header";
import { data } from "../utils/data";
import { FaShoppingBag } from "react-icons/fa";
import {
  BsPersonFill,
  BsThreeDotsVertical,
  BsSearch,
  BsFillJournalBookmarkFill,
} from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "@mui/material";
import LoadingPage from "./LoadingPage";

const TaskPage = () => {
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

  const [isLoading, setisLoading] = useState(false);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-[90rem] mx-auto p-4">
      <div className="text-sm breadcrumbs p-2 mx-5">
        <ul>
          <li>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Home
            </a>
          </li>
          <li>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Documents
            </a>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Add Document
          </li>
        </ul>
      </div>
      <div className="w-full border rounded-lg bg-white m-auto">
        <div className="flex p-2 justify-between items-center gap-3 flex-col md:flex-row">
          <div className="flex-1">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <AiOutlineSearch size={23} />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  placeholder="Search for Student"
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <BsSearch size={20} />
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>

          <div className="form-control w-full max-w-xs">
            <select className="select select-md select-bordered bg-white ">
              <option disabled selected>
                Filter By Classroom
              </option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full mt-3 max-h-[70vh] m-auto p-3 border rounded-lg bg-white overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
        <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
          <span>Order</span>
          <span className="sm:text-left text-right">Status</span>
          <span className="hidden md:grid">Last Order</span>
          <span className="hidden sm:grid">Method</span>
        </div>
        <ul>
          {data.map((order, id) => (
            <li
              key={id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
            >
              <div className="flex">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BsFillJournalBookmarkFill className="text-purple-800" />
                </div>
                <div className="pl-4">
                  <p className="text-gray-800 font-bold">
                    ${order.total.toLocaleString()}
                  </p>
                  <p className="text-gray-800 text-sm">{order.name.first}</p>
                </div>
              </div>
              <p className="text-gray-600 sm:text-left text-right">
                <span
                  className={
                    order.status == "Processing"
                      ? "bg-green-200 p-2 rounded-lg"
                      : order.status == "Completed"
                      ? "bg-blue-200 p-2 rounded-lg"
                      : "bg-yellow-200 p-2 rounded-lg"
                  }
                >
                  {order.status}
                </span>
              </p>
              <p className="hidden md:flex">{order.date}</p>
              <div className="sm:flex hidden justify-between items-center">
                <p>{order.method}</p>
                <BsThreeDotsVertical />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-7 right-10">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <SpeedDialAction className="relative">
              <HomeIcon className="h-5 w-5" />
              <Typography {...labelProps}>Home</Typography>
            </SpeedDialAction>
            <SpeedDialAction className="relative">
              <CogIcon className="h-5 w-5" />
              <Typography {...labelProps}>Add User</Typography>
            </SpeedDialAction>
            <SpeedDialAction className="relative">
              <Square3Stack3DIcon
                className="h-5 w-5"
                onClick={() => console.log("Pages")}
              />
              <Typography {...labelProps}>Pages</Typography>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
};

export default TaskPage;
