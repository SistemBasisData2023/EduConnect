import React, { useContext, useEffect, useState } from "react";
import { data } from "../utils/data";
import {
  BsPersonFill,
  BsThreeDotsVertical,
  BsSearch,
  BsFillJournalBookmarkFill,
  BsCloudDownload,
} from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

import { TablePagination, Typography } from "@mui/material";
import LoadingPage from "./LoadingPage";
import { getAllStudent } from "../api/Student";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../components/Context/UserContext";
import SpeedDialComp from "../components/SpeedDialComp";

const TaskStudentPage = () => {
  //Global State
  const { user, setSubject_id, isLoading } = useContext(UserContext);
  //Local State
  const [allTasks, setAllTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [subject, setSubjects] = useState([]);

  const [filterTask, setFilterTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [localLoading, setLocalLoading] = useState(true);

  //Pagination AI
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Jumlah item per halaman
  const [totalRows, setTotalRows] = useState(0);

  //React Router
  const navigate = useNavigate();
  const subject_idParams = useParams().subject_id;

  // //Sementara
  // const [subject_id, setSubject_id] = useState(
  //   "cc9312c7-16ee-41f1-9bd2-0ee451ef76a5"
  // );

  //Speed Dial
  const handleOpen = () => {
    user?.subject_id
      ? navigate(`/task/addTask/${user.subject_id}`)
      : navigate(`/task/error`);
  };

  // const handleAddClick = () => {
  //   navigate("/task/addTask");
  // };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Jakarta",
    };

    const formattedDate = date.toLocaleString("id-ID", options);

    return formattedDate;
  };

  const handlePageChange = (event, newPage) => {
    console.log(newPage);
    setPage(newPage + 1);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1); // Set halaman kembali ke 1 setelah mengubah jumlah item per halaman
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = allTasks.filter((task) => {
      return task.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilterTask("All Tasks");
    setTasks(filtered);
  };

  const getAllTask = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/task/`);

      setAllTasks(data.data);
      setTotalRows(data.data.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      setTasks(data.data.slice(startIndex, endIndex));
      setLocalLoading(false);
    } catch (error) {
      console.error(error.response.data.message);
      setLocalLoading(false);
    }
  };

  const getTaskTeacher = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/task/getTaskTeacher/${user.subject_id}`
      );

      setAllTasks(data.data);
      setTotalRows(data.data.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      setTasks(data.data.slice(startIndex, endIndex));

      setLocalLoading(false);
    } catch (error) {
      console.error(error.response.data.message);

      setLocalLoading(false);
    }
  };

  const getFilteredTeacherTask = async (filter) => {
    let newFilter = "T" + filter;
    console.log(newFilter);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/task/${newFilter}/${user.subject_id}`
      );

      setAllTasks(data.data);
      setTotalRows(data.data.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      setTasks(data.data.slice(startIndex, endIndex));
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    //Calling API when first reloading the page
    setLocalLoading(true);
    {
      user?.role === "Admin" ? getAllTask() : getTaskTeacher();
      user?.subject_id && setSubject_id(user.subject_id);
    }
  }, []);

  //Handle Filter and Pagination
  useEffect(() => {
    filterTask === "All Tasks" || filterTask === ""
      ? getTaskTeacher()
      : filterTask === "Active"
      ? getFilteredTeacherTask("active")
      : getFilteredTeacherTask("overdue");
  }, [filterTask, page, limit]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (localLoading) return <LoadingPage />;

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
              onChange={(e) => setFilterTask(e.target.value)}
              defaultValue={"All Tasks"}
              value={filterTask}
            >
              <option>All Tasks</option>

              <option>Active</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full mt-3 max-h-[70vh] m-auto p-3 border rounded-lg bg-white overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
        <div className="my-1 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
          <span>Name</span>
          <span className="sm:text-left text-right">Status</span>
          <span className="hidden md:grid">Deadline</span>
          <div className="hidden sm:grid">
            <span className="hidden sm:grid">Submission</span>
          </div>
        </div>

        <ul>
          {tasks?.map((task, id) => (
            <li
              key={id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              onClick={() => navigate(`submission/${task.id}`)}
            >
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BsFillJournalBookmarkFill className="text-purple-800" />
                </div>
                <p className="pl-4">{task.name}</p>
              </div>
              <p className="text-white sm:text-left text-right">
                <span
                  className={
                    task.is_completed
                      ? "bg-yellow-700 p-2 rounded-lg"
                      : task.is_active
                      ? "bg-purple-700 p-2 rounded-lg"
                      : "bg-red-700 p-2 rounded-lg"
                  }
                >
                  {task.is_completed
                    ? "Completed"
                    : task.is_active
                    ? "Active"
                    : "Overdue"}
                </span>
              </p>
              <p className="hidden md:flex overflow-x-hidden">
                {formatDate(task.deadline)}
              </p>
              {/* <div className="sm:flex hidden justify-between items-center">
                <div className="">
                  <button
                    className="rounded-lg bg-blue-500 text-white text-sm py-1 px-2 hover:bg-blue-700 lg:ml-10 md:ml-5"
                    onClick={() => navigate(`submitTask/${task.id}`)}
                  >
                    Submit
                  </button>
                </div>
                <div
                  className="ml-3 bg-blue-100 p-2 rounded-lg text-center"
                  onClick={() => console.log("Download Task")}
                >
                  <BsCloudDownload
                    size={20}
                    className="text-purple-800 transition duration-100 ease-in-out transform hover:scale-120 active:scale-90 hover:text-blue-800"
                  />
                </div>

                <p>{task.method}</p>
              </div> */}
              <div className="sm:flex hidden justify-between items-center">
                <p>Submission</p>
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
      <div className="absolute bottom-7 right-10">
        <SpeedDialComp
          handleOpen={handleOpen}
          addMessage={"Add Task"}
          icon={"BiTask"}
        />
      </div>
    </div>
  );
};

export default TaskStudentPage;
