import React, { useContext, useEffect, useState } from "react";

import { AiOutlineUser } from "react-icons/ai";
import Header from "../components/Header";
import Datepicker from "react-tailwindcss-datepicker";
import PickDate from "../components/PickDate";
import AlertDialog from "../components/AlertSuccess";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { UserContext } from "../components/Context/UserContext";
import {
  AiOutlineFilePdf,
  AiOutlineFileZip,
  AiOutlineFileJpg,
  AiFillCheckCircle,
} from "react-icons/ai";

import {
  BsFillImageFill,
  BsCloudUpload,
  BsFiletypeTxt,
  BsFiletypePng,
} from "react-icons/bs";

//React Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

//Dropzone
import { useDropzone } from "react-dropzone";
import axios from "axios";

const AddTaskPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState();
  const { subject_id } = useParams();

  //Toast
  const success = () =>
    toast.success(`Succesfully Assign Task to ${user?.subject_name} `);
  const failed = () =>
    toast.error(`Failed Assign Task to ${user?.subject_name} `);

  //Form
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  //Dropzone and File Handle
  const onDrop = (acceptedFiles) => {
    // Lakukan operasi dengan file yang diterima
    console.log(acceptedFiles[0]);
    let newFile = acceptedFiles[0];
    setFile(newFile);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const getFileIcon = () => {
    const extension = file.name.split(".").pop();
    if (extension === "pdf") {
      return <AiOutlineFilePdf size={24} />;
    } else if (extension === "zip") {
      return <AiOutlineFileZip size={24} />;
    } else if (extension === "jpg") {
      return <AiOutlineFileJpg size={24} />;
    } else if (extension === "png") {
      return <BsFiletypePng size={24} />;
    }

    return <BsFiletypeTxt size={24} />;
  };

  //HandleClick
  const handleAssignTask = (e) => {
    e.preventDefault();
    assignTask();
  };

  const handleClose = () => {
    setOpen(false);
  };

  //API
  const updateTaskStatus = async () => {
    try {
      await axios.put("http://localhost:5000/task/updateStatus");
    } catch (error) {
      console.error(error);
    }
  };

  //API
  const assignTask = async () => {
    try {
      const formData = new FormData();

      //Get data from Form
      formData.append("filename", file);
      formData.append("task_name", fileName);
      formData.append("subject_id", subject_id);
      formData.append("description", description);
      formData.append("deadline", deadline);
      console.log(formData);

      // Call API
      const { data } = await axios.post(
        `http://localhost:5000/task/assign`,
        formData,
        {
          Headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //Call Toast
      success();
      updateTaskStatus();
      setTimeout(() => {
        navigate(`/task/${subject_id}`);
      }, 3000);
    } catch (error) {
      console.error(error);
      failed();
    }
  };

  useEffect(() => {
    console.log(user?.subject_id);
    console.log(subject_id);
    if (user?.role !== "Admin" && user?.subject_id !== subject_id) {
      console.log("Error");
      navigate("/error");
    }
  }, []);

  return (
    <div className=" max-w-4xl mx-auto my-2 p-5 bg-white shadow-xl rounded-lg h-[88vh] overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
      <form className="text-black font-medium">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-between">
              <div className="">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Add Task
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              {/* <h2 className="text-base font-semibold leading-7 text-gray-900 text md:mr-20">
                Chemistry
              </h2> */}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Task Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm sm:max-w-md">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full bg-white rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      onChange={(e) => setFileName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2 max-w-sm sm:max-w-md">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Deadline
                </label>
                <div className="border border-gray-300 shadow-sm rounded-lg">
                  <PickDate setDeadline={setDeadline} />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Task Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full  bg-white rounded-md border py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 ring-1 ring-inset ring-gray-300"
                    defaultValue={""}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences for student
                </p>
              </div>

              {/* <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <AiOutlineUser
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div> */}

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  File
                </label>

                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div
                      {...getRootProps()}
                      className={`dropzone ${
                        isDragActive ? "active" : ""
                      } w-full h-full flex justify-center items-center`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <BsCloudUpload size={35} className="text-gray-500" />
                        <p
                          className={`mb-2 text-sm text-gray-500 dark:text-gray-400 ${
                            file ? "hidden" : ""
                          }`}
                        >
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p
                          className={`text-xs text-gray-500 dark:text-gray-400 ${
                            file ? "hidden" : ""
                          }`}
                        >
                          PDF, PNG, JPG or ZIP (MAX. 5MB)
                        </p>
                        <div className="flex gap-1 items-center text-gray-500">
                          {file && (
                            <div className="text-red-500">
                              {getFileIcon(file)}
                            </div>
                          )}
                          <p className="text-md text-gray-500 dark:text-gray-400">
                            {file?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <input {...getInputProps()} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleAssignTask}
          >
            Add Task
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AddTaskPage;
