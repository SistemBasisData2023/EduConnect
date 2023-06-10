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
import { FiDownload } from "react-icons/fi";

import { TablePagination, Typography } from "@mui/material";
import LoadingPage from "./LoadingPage";
import { getAllStudent } from "../api/Student";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../components/Context/UserContext";
import SpeedDialComp from "../components/SpeedDialComp";
//React Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ScoreDialog from "../components/ScoreDialog";
import DownloadDialog from "../components/DownloadDialog";

const SubmissionPage = () => {
  //Global State
  const { user } = useContext(UserContext);

  //Params
  const { task_id } = useParams();
  const navigate = useNavigate();

  //Local State
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [subject, setSubjects] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [filterTask, setFilterSubject] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //Dialog
  const [dialogSub_id, setDialogSub_id] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submissionInput, setSubmissionInput] = useState("");

  //Download Modal
  const [downloadOpen, setDownloadOpen] = useState(false);
  //Navigate
  const [url, setUrl] = useState();

  //
  const handleDownload = (url) => {
    setDownloadOpen(true);
    setUrl(url);
  };

  //Pagination AI
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Jumlah item per halaman
  const [totalRows, setTotalRows] = useState(0);

  //Toast
  const info = () => toast.info(`Welcome to Submission Page`);
  const success = () => toast.success(`Successfully Update Score`);
  const failed = () => toast.failed(`Failed to Update Score`);

  //Sementara
  const [student_id, setStudent_id] = useState(
    "e36451d2-b778-4e42-b316-fbb2829974eb"
  );
  const [subject_id, setSubject_id] = useState(
    "cc9312c7-16ee-41f1-9bd2-0ee451ef76a5"
  );

  //Speed Dial
  const handleOpen = () => {
    user?.subject_id
      ? navigate(`/task/addTask/${user.subject_id}`)
      : navigate(`/task/error`);
  };

  const handleAddClick = () => {
    navigate("/task/addTask");
  };

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

  const removeFileType = (fileName) => {
    const dotIndex = fileName.lastIndexOf(".");
    if (dotIndex !== -1) {
      return fileName.substring(0, dotIndex);
    }
    return fileName;
  };

  //Handle Dialog Open
  //=================================
  const handleDialogOpen = (submission_id) => {
    //Assign nilai submission_id
    setDialogSub_id(submission_id);

    setDialogOpen((cur) => !cur);
  };

  const handleSubmitScore = (e, score) => {
    e.preventDefault();
    //Panggil API update score
    updateScore(score);
    //Reset Nilai
    setDialogSub_id("");
    setDialogOpen(false);
  };

  //=================================

  //Handle Pagination
  //=================================
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
    let filtered;
    if (searchTerm === "") {
      filtered = allSubmissions.filter((task) => {
        return task.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else {
      filtered = submissions.filter((task) => {
        return task.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    setSubmissions(filtered);
  };

  //=================================
  //Handle Download
  // const handleDownloadSub = () =>{

  // }

  //API CALL
  //=================================
  // const getAllTask = async () => {
  //   try {
  //     const { data } = await axios.get(`http://localhost:5000/task/`);

  //     setAllTasks(data.data);
  //     setTotalRows(data.data.length);
  //     const startIndex = (page - 1) * limit;
  //     const endIndex = startIndex + limit;

  //     // Cek apakah task_id valid berada pada data.data
  //     const taskIndex = data.data.findIndex((task) => task.id === task_id);
  //     const isTaskFound = taskIndex === -1;

  //     console.log(isTaskFound ? navigate("/dashboard") : console.log("Hello"));
  //     // Lakukan tindakan lain di sini berdasarkan hasil pengecekan
  //   } catch (error) {
  //     console.error(error.response.data.message);
  //   }
  // };

  const getTaskSubmission = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/task/submission/${task_id}`
      );

      setTotalRows(data.data.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      setSubmissions(data.data.slice(startIndex, endIndex));
      setAllSubmissions(data.data);
      setisLoading(false);
    } catch (error) {
      console.error(error.response.data.message);
      setisLoading(false);
    }
  };

  const updateScore = async (score) => {
    try {
      const body = {
        submission_id: dialogSub_id,
        score: score,
      };
      await axios.post(`http://localhost:5000/task/submission/addScore`, body);
      //Panggil Toast Success
      success();
      //Refetch
      getTaskSubmission();
    } catch (error) {
      console.error(error.response.data.message);
      //Panggil Toast Gagal
      failed();
    }
  };
  //=================================

  // const getTaskTeacher = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:5000/task/getTaskTeacher/${subject_id}`
  //     );

  //     setAllTasks(data.data);
  //     setTotalRows(data.data.length);
  //     const startIndex = (page - 1) * limit;
  //     const endIndex = startIndex + limit;

  //     setSubmissions(data.data.slice(startIndex, endIndex));
  //   } catch (error) {
  //     console.error(error.response.data.message);
  //   }
  // };

  // const getFilteredTeacherTask = async (filter) => {
  //   let newFilter = "T" + filter;
  //   console.log(newFilter);
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:5000/task/${newFilter}/${subject_id}`
  //     );

  //     setAllTasks(data.data);
  //     setTotalRows(data.data.length);
  //     const startIndex = (page - 1) * limit;
  //     const endIndex = startIndex + limit;

  //     setSubmissions(data.data.slice(startIndex, endIndex));
  //   } catch (error) {
  //     console.error(error.response.data.message);
  //   }
  // };

  //Error Handling
  useEffect(() => {
    //Calling API when first reloading the page
    setisLoading(true);

    // getAllTask();
    getTaskSubmission();
  }, []);

  // //Handle Filter and Pagination
  // useEffect(() => {
  //   filterTask === "All Tasks" || filterTask === ""
  //     ? getTaskTeacher()
  //     : filterTask === "Active"
  //     ? getFilteredTeacherTask("active")
  //     : getFilteredTeacherTask("overdue");
  // }, [filterTask, page, limit]);

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
              onChange={(e) => setFilterSubject(e.target.value)}
              defaultValue={"All Tasks"}
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
          <span className="sm:text-left text-right">Score</span>
          <span className="hidden md:grid">Submitted At</span>
          <div className="hidden sm:grid">
            <span className="hidden sm:grid">Download</span>
          </div>
        </div>

        <ul>
          {submissions?.map((submission, id) => (
            <li
              key={submission.submission_id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BsFillJournalBookmarkFill className="text-purple-800" />
                </div>
                <p className="pl-4">
                  {submission?.name && removeFileType(submission.name)}
                </p>
              </div>
              <p
                className="text-white sm:text-left text-right"
                onClick={() => handleDialogOpen(submission.submission_id)}
              >
                <span
                  className={
                    submission.is_completed
                      ? "bg-yellow-700 p-2 rounded-lg"
                      : submission.is_active
                      ? "bg-purple-700 p-2 rounded-lg"
                      : "bg-red-700 p-2 rounded-lg"
                  }
                >
                  {submission?.score === null
                    ? "Score"
                    : submission.score + " / 100"}
                  {/* {submission.is_completed
                    ? "Completed"
                    : submission.is_active
                    ? "Active"
                    : "Overdue"} */}
                </span>
              </p>
              <p className="hidden md:flex overflow-x-hidden">
                {formatDate(submission.submitted_at)}
              </p>

              <div className="sm:flex hidden justify-between items-center ml-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-center  text-white font-bold py-2 px-4 rounded-md inline-flex items-center"
                  onClick={() => handleDownload(submission.link_submission)}
                >
                  <FiDownload size={20} />
                </button>
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
      <ScoreDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleSubmitScore={handleSubmitScore}
        handleDialogOpen={handleDialogOpen}
        submissionInput={submissionInput}
        setSubmissionInput={setSubmissionInput}
      />
      <DownloadDialog
        downloadOpen={downloadOpen}
        setDownloadOpen={setDownloadOpen}
        url={url}
      />
    </div>
  );
};

export default SubmissionPage;
