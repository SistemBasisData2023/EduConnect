import React, { useContext, useEffect, useState } from "react";
import { BsPersonFill, BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

import { TablePagination, Typography } from "@mui/material";
import LoadingPage from "./LoadingPage";
import axios from "axios";
import SpeedDialComp from "../components/SpeedDialComp";
import { UserContext } from "../components/Context/UserContext";

const TeacherPage = () => {
  //Global Variables
  const { user } = useContext(UserContext);

  const [allTeachers, setAllTeachers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //Pagination AI
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Jumlah item per halaman
  const [totalRows, setTotalRows] = useState(0);

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1); // Set halaman kembali ke 1 setelah mengubah jumlah item per halaman
  };

  //Navigate to addUser
  const handleOpen = () => {
    navigate("/addUser");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = allTeachers.filter((teacher) => {
      return teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setTeachers(filtered);
  };

  const getAllTeachers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/teacher`);

      setAllTeachers(data.data);
      setTotalRows(data.data.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      setTeachers(data.data.slice(startIndex, endIndex));
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setisLoading(true);
    getAllTeachers();
    setisLoading(false);
  }, []);

  useEffect(() => {
    getAllTeachers();
  }, [page, limit]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-[90rem] mx-auto p-4">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  placeholder="Search for Student"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                onClick={(e) => handleSearch(e)}
                className="p-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <BsSearch size={20} />
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full mt-3 max-h-[70vh] m-auto p-3 border rounded-lg bg-white overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
        <div className="my-1 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
          <span>Name</span>
          <span className="sm:text-left text-right">Subject</span>
          <span className="hidden md:grid">Teacher Number</span>
          <span className="hidden sm:grid">Class</span>
        </div>
        <ul className="scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
          {teachers?.map((teacher, id) => (
            <li
              key={id}
              onClick={() => console.log(teacher.id)}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BsPersonFill className="text-blue-600" />
                </div>
                <p className="pl-4">{teacher.name}</p>
              </div>
              <p className="text-gray-600 sm:text-left text-right">
                {teacher.subject_name ? teacher.subject_name : "No Course"}
              </p>
              <p className="hidden md:flex">{teacher.nomor_induk_guru}</p>
              <div className="sm:flex hidden justify-between items-center">
                <p>
                  {teacher.classroom_name
                    ? teacher.classroom_name
                    : "No Classroom"}
                </p>
                <BsThreeDotsVertical />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 30]}
        component="div"
        count={totalRows} //Total Pages
        page={page - 1} // Page
        onPageChange={handlePageChange}
        rowsPerPage={limit} //Limit
        onRowsPerPageChange={handleLimitChange}
      />

      <div className={`${user?.role === "Admin" ? "" : "hidden"}`}>
        <SpeedDialComp handleOpen={handleOpen} addMessage={"Add Teacher"} />
      </div>
    </div>
  );
};

export default TeacherPage;
