import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { data } from "../utils/data";
import { BsPersonFill, BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { BiBookOpen } from "react-icons/bi";

import { TablePagination, Typography } from "@mui/material";
import LoadingPage from "./LoadingPage";
import { getAllStudent } from "../api/Student";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import MateTable from "../components/Resource/MateTable";
import { Link, useNavigate } from "react-router-dom";
import AddResource from "../components/AddResource";
import DownloadDialog from "../components/DownloadDialog";
import { UserContext } from "../components/Context/UserContext";
import SpeedDialComp from "../components/SpeedDialComp";

const ResourcePage = () => {
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

  const [allResources, setAllResources] = useState([]);
  const [resources, setResources] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [filterSubject, setFilterSubject] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //Pagination AI
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Jumlah item per halaman
  const [totalRows, setTotalRows] = useState(0);
  //Modal Toggle
  const [open, setOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  //Navigate
  const [url, setUrl] = useState();

  //Global State
  const { user } = useContext(UserContext);

  const handleOpen = () => {
    setOpen(!open);
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
    const filtered = allResources.filter((resource) => {
      return resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilterSubject("All Subjects");
    setResources(filtered);
  };

  const handleDownload = (url) => {
    setDownloadOpen(true);
    setUrl(url);
    // navigate(url);
  };

  const getAllResources = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/resource`);

      setAllResources(data.data);
      setTotalRows(data.data.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      setResources(data.data.slice(startIndex, endIndex));
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  const getResourcesBySubject = async (subjectName) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/resource/getResourcesBySubject/${subjectName}`
      );

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      setResources(data.data.slice(startIndex, endIndex));
      setTotalRows(data.data.length);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/subject/");
      setSubjects(data.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setisLoading(true);
    getAllResources();
    getAllSubjects();
    setisLoading(false);
  }, []);

  useEffect(() => {
    filterSubject == "All Subjects" || filterSubject == ""
      ? getAllResources()
      : getResourcesBySubject(filterSubject);
  }, [filterSubject, page, limit]);

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
              defaultValue={"All Subjects"}
              value={filterSubject}
            >
              <option>All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {subject.name}
                </option>
              ))}
              {/* {allResources.map((subject) => (
                <option key={subject.id} value={subject.classroom_name}>
                  {subject.classroom_name}
                </option>
              ))} */}
            </select>
            {/* <Select
              label="Filter By Classroom"
              className="bg-gray-50 text-gray-900 text-sm"
              value={filterSubject}
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
        <div className="my-1 p-2 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-2 items-center justify-between cursor-pointer">
          <span>Name</span>
          <span className="md:text-left text-right">Download</span>
          <span className="hidden md:grid">Subject</span>
          {/* <span className="hidden sm:grid">Nomor Induk</span> */}
        </div>
        <ul className="scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
          {resources?.map((resource, id) => (
            <li
              key={id}
              onClick={() => console.log(resource.id)}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-2 items-center justify-between cursor-pointer"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BiBookOpen className="text-blue-600" />
                </div>
                <p className="pl-4 pb-1 overflow-hidden overflow-x-auto overscroll-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-gray-50">
                  {resource.name}
                </p>
              </div>
              <div className="text-gray-600 md:text-left text-right">
                <div className="flex justify-end mr-5 md:justify-start md:ml-10 lg:ml-6">
                  <div
                    className="bg-blue-100 p-2 rounded-lg hover:bg-blue-200"
                    onClick={() => handleDownload(resource.url)}
                  >
                    <FiDownload size={20} />
                  </div>
                </div>
              </div>
              <p className="hidden md:flex">{resource.subject_name}</p>
              {/* <div className="sm:flex hidden justify-between items-center">
                <p>{"dadadadada"}</p>
                <BsThreeDotsVertical />
              </div> */}
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
      <AddResource
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        getAllResources={getAllResources}
      />
      <DownloadDialog
        downloadOpen={downloadOpen}
        setDownloadOpen={setDownloadOpen}
        url={url}
      />
      {/* <div
        className={`${
          user?.role === "Student" ? "hidden" : "absolute"
        } bottom-7 right-10`}
      >
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
              <CogIcon className="h-5 w-5" onClick={() => handleOpen()} />
              <Typography {...labelProps}>Add Resource</Typography>
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
      </div> */}
      <SpeedDialComp handleOpen={handleOpen} addMessage={"Add Resource"} />
    </div>
  );
};

export default ResourcePage;
