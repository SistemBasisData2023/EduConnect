import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { data } from "../utils/data";
import {
  BsPersonFill,
  BsThreeDotsVertical,
  BsSearch,
  BsFillJournalBookmarkFill,
  BsCloudDownload,
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
import { TablePagination, Typography } from "@mui/material";
import LoadingPage from "./LoadingPage";
import { getAllStudent } from "../api/Student";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DownloadDialog from "../components/DownloadDialog";

//React Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../components/Context/UserContext";

const TaskStudentPage = () => {
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

  //Global Variables
  const { user, subject_id, setSubject_id } = useContext(UserContext);

  const subject_idParams = useParams().subject_id;

  const [allTasks, setAllTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [subject, setSubjects] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [filterTask, setFilterTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //Pagination AI
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Jumlah item per halaman
  const [totalRows, setTotalRows] = useState(0);

  const navigate = useNavigate();

  //Handle Download Modal
  const [downloadOpen, setDownloadOpen] = useState(false);
  //Navigate
  const [url, setUrl] = useState();

  const handleDownload = (url) => {
    setDownloadOpen(true);
    setUrl(url);
  };

  //Toast
  const info = () => toast.info(`Downloading File`);

  //Sementara
  // const [student_id, setStudent_id] = useState(
  //   "e36451d2-b778-4e42-b316-fbb2829974eb"
  // );
  // const [subject_id, setSubject_id] = useState(
  //   "8c109d04-71e6-4b41-9d84-96ed631585a2"
  // );

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

  const getTasksBySubject = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/task/${subject_idParams}/${user.id}`
      );
      setAllTasks(data.data);

      setTotalRows(data.data.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      setTasks(data.data.slice(startIndex, endIndex));

      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error(error);
    }
  };

  const getFilteredTask = async (filter) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/task/${filter}/${subject_idParams}/${user.id}`
      );

      setAllTasks(data.data);
      setTotalRows(data.data.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      setTasks(data.data.slice(startIndex, endIndex));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //Calling API when first reloading the page
    setisLoading(true);
    setSubject_id(subject_idParams);
    getTasksBySubject();
  }, []);

  //Handle Filter and Pagination
  useEffect(() => {
    // filterTask == "All Tasks" || filterTask == ""
    //   ? getTasksBySubject()
    //   : getStudentByClassroom(filterTask);
    filterTask === "All Tasks" || filterTask === ""
      ? getTasksBySubject()
      : filterTask === "Completed"
      ? getFilteredTask("completed")
      : filterTask === "Active"
      ? getFilteredTask("active")
      : getFilteredTask("overdue");
  }, [filterTask, page, limit]);

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
              onChange={(e) => setFilterTask(e.target.value)}
              defaultValue={"All Tasks"}
              value={filterTask}
            >
              <option>All Tasks</option>
              <option>Completed</option>
              <option>Active</option>
              <option>Overdue</option>
              {/* {subject.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {subject.name}
                </option>
              ))} */}
              {/* {allTasks.map((subject) => (
                <option key={subject.id} value={subject.classroom_name}>
                  {subject.classroom_name}
                </option>
              ))} */}
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
            <div className="flex justify-around items-center">
              <span className="">Submit</span>
              <span className="">Download</span>
            </div>
          </div>
        </div>

        <ul>
          {tasks?.map((task, id) => (
            <li
              key={id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
            >
              {/* <div className="flex">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">
                      ${task.total.toLocaleString()}
                    </p>
                    <p className="text-gray-800 text-sm">{task.name.first}</p>
                  </div>
                </div> */}
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
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
                  // {
                  //   task.is_active == false
                  //     ? "bg-red-700 p-2 rounded-lg"
                  //     : "bg-yellow-700 p-2 rounded-lg"
                  // }
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
              <div className="sm:flex hidden justify-between items-center">
                <div className="">
                  <button
                    className={`rounded-lg text-white text-sm py-1 px-2 lg:ml-10 md:ml-5 ${
                      task.is_completed
                        ? "bg-gray-400 hover:bg-gray-700 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                    onClick={() => navigate(`submitTask/${task.id}`)}
                    disabled={task.is_completed}
                  >
                    {task.is_completed ? "Submitted" : "Submit"}
                  </button>
                </div>
                <div
                  className="ml-3 bg-blue-100 p-2 rounded-lg text-center"
                  onClick={() => handleDownload(task.url)}
                >
                  <BsCloudDownload
                    size={20}
                    className="text-purple-800 transition duration-100 ease-in-out transform hover:scale-120 active:scale-90 hover:text-blue-800"
                  />
                </div>

                <p>{task.method}</p>
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
      <DownloadDialog
        downloadOpen={downloadOpen}
        setDownloadOpen={setDownloadOpen}
        url={url}
        toast={info}
      />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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

export default TaskStudentPage;
