import React from "react";
import Header from "../components/Header";
import { data } from "../utils/data";
import { BsPersonFill, BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="flex-1 bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-[90rem] mx-auto p-4">
        <div className="w-full border rounded-lg bg-white m-auto">
          <div className="flex p-2 justify-between items-center gap-3 flex-col sm:flex-row">
            <div className="flex-1">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">
                  Search
                </label>
                <div class="relative w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AiOutlineSearch size={23} />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                    placeholder="Search for Student"
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="p-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <BsSearch size={20} />
                  <span class="sr-only">Search</span>
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

        <div className="w-full mt-3 max-h-[73vh] m-auto p-3 border rounded-lg bg-white overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
          <div className="my-1 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Method</span>
          </div>
          <ul className="scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
            {data.map((order, id) => (
              <li
                key={id}
                onClick={() => console.log(order)}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <BsPersonFill className="text-blue-600" />
                  </div>
                  <p className="pl-4">
                    {order.name.first + " " + order.name.last}
                  </p>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  {order.name.first}@gmail.com
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
      </div>
    </div>
  );
};

export default Dashboard;
