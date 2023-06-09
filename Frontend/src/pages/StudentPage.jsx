import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { data } from "../utils/data";
import { BsPersonFill, BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

import { TablePagination, Typography } from "@mui/material";
import LoadingPage from "./LoadingPage";
import { getAllStudent } from "../api/Student";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { UserContext } from "../components/Context/UserContext";
import SpeedDialComp from "../components/SpeedDialComp";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  //Global Variables
  const { user } = useContext(UserContext);

  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [filterClassroom, setFilterClassroom] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  //Pagination AI
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Jumlah item per halaman
  const [totalRows, setTotalRows] = useState(0);

  const handlePageChange = (event, newPage) => {
    console.log(newPage);
    setPage(newPage + 1);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1); // Set halaman kembali ke 1 setelah mengubah jumlah item per halaman
  };

  //Searching
  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = allStudents.filter((student) => {
      return student.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilterClassroom("All Classrooms");

    setStudents(filtered);
  };

  //Navigate to addUser
  const handleOpen = () => {
    navigate("/addUser");
  };

  const getAllStudents = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/student`);

      setAllStudents(data.data);
      setTotalRows(data.data.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      setisLoading(false);
      setStudents(data.data.slice(startIndex, endIndex));
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  const getStudentByClassroom = async (classroomName) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/student/getStudentByClassroom/${classroomName}`
      );

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      setStudents(data.data.slice(startIndex, endIndex));
      setTotalRows(data.data.length);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const getAllClassrooms = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/classroom/");
      setClassrooms(data.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    //Calling API when first reloading the page

    setisLoading(true);
    getAllStudents();
    getAllClassrooms();
  }, []);

  //Handle Filter and Pagination
  useEffect(() => {
    filterClassroom == "All Classrooms" || filterClassroom == ""
      ? getAllStudents()
      : getStudentByClassroom(filterClassroom);
  }, [filterClassroom, page, limit]);

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

          <div className="form-control w-full max-w-xs">
            <select
              className="select select-md select-bordered bg-white "
              onChange={(e) => setFilterClassroom(e.target.value)}
              defaultValue={"All Classrooms"}
              value={filterClassroom}
            >
              <option>All Classrooms</option>
              {classrooms.map((classroom) => (
                <option key={classroom.id} value={classroom.name}>
                  {classroom.name}
                </option>
              ))}
              {/* {allStudents.map((classroom) => (
                <option key={classroom.id} value={classroom.classroom_name}>
                  {classroom.classroom_name}
                </option>
              ))} */}
            </select>
            {/* <Select
              label="Filter By Classroom"
              className="bg-gray-50 text-gray-900 text-sm"
              value={filterClassroom}
              onChange={(e) => console.log(e.target.value)}
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select> */}
          </div>
        </div>
      </div>

      <div className="w-full mt-3 max-h-[70vh] m-auto p-3 border rounded-lg bg-white overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
        <div className="my-1 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
          <span>Name</span>
          <span className="sm:text-left text-right">Classroom</span>
          <span className="hidden md:grid">Age</span>
          <span className="hidden sm:grid">Student Number</span>
        </div>
        <ul className="scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
          {students?.map((student, id) => (
            <li
              key={id}
              onClick={() => console.log(student.id)}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BsPersonFill className="text-blue-600" />
                </div>
                <p className="pl-4">{student.name}</p>
              </div>
              <p className="text-gray-600 sm:text-left text-right">
                {student.classroom_name}
              </p>
              <p className="hidden md:flex">{student.age}</p>
              <div className="sm:flex hidden justify-between items-center">
                <p>{student.nomor_induk_siswa}</p>
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
        <SpeedDialComp handleOpen={handleOpen} addMessage={"Add Student"} />
      </div>
    </div>
  );
};

export default StudentPage;
