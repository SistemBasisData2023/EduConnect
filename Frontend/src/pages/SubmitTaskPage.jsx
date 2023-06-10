import React, { useContext, useEffect, useState } from "react";
import PickDate from "../components/PickDate";
import AlertDialog from "../components/AlertSuccess";
import {
  BsFillImageFill,
  BsCloudUpload,
  BsFiletypeTxt,
  BsFiletypePng,
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import { useDropzone } from "react-dropzone";
import {
  AiOutlineFilePdf,
  AiOutlineFileZip,
  AiOutlineFileJpg,
  AiFillCheckCircle,
} from "react-icons/ai";
import {
  Alert,
  Button,
  Dialog,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { UserContext } from "../components/Context/UserContext";

const SubmitTaskPage = () => {
  //GLobal State
  const { user } = useContext(UserContext);

  const [open, setOpen] = useState();
  const { task_id } = useParams();

  const [task, setTask] = useState();

  const [isloading, setIsLoading] = useState(true);
  const [file, setFile] = useState();

  const navigate = useNavigate();

  //Alert
  const [alertOpen, setAlertOpen] = useState(false);

  const handleShowAlert = () => {
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 5000);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  // //Sementara
  // const [student_id, setStudent_id] = useState(
  //   "e36451d2-b778-4e42-b316-fbb2829974eb"
  // );
  // const [subject_id, setSubject_id] = useState(
  //   "8c109d04-71e6-4b41-9d84-96ed631585a2"
  // );

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    submitTask();
  };

  // const handleFileChange = (event) => {
  //   const files = event.target.files[0];
  //   console.log(files);
  // };

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

  const getTaskById = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/task/${task_id}`);
      setTask(data.data);
    } catch (error) {
      console.error(error.data.response.message);
    }
  };

  const submitTask = async () => {
    try {
      const formData = new FormData();

      formData.append("filename", file);
      console.log(task_id);
      console.log(user.id);

      formData.append("submission_name", file.name);
      formData.append("student_id", user.id);
      formData.append("task_id", task_id);
      console.log(formData);

      const { data } = await axios.post(
        `http://localhost:5000/task/submit`,
        formData,
        {
          Headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTaskById();
    setIsLoading(false);
  }, []);

  if (isloading) {
    return <LoadingPage />;
  }

  return (
    <div className=" max-w-4xl mx-5 sm:mx-auto my-12 p-5 bg-white shadow-xl rounded-lg ">
      <form className="text-black font-medium">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-900 border-b border-gray-900/10 pb-2">
              {task?.name}
            </h2>

            {/* <p className="mt-1 text-sm leading-6 text-gray-600 border-b border-gray-900/10 py-3">
              Task Name :{" "}
              <span className="text-black font-semibold">
                Perubahan Entalpi
              </span>
            </p> */}
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Task Description :
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              {task?.description}
            </p>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Deadline : {formatDate(task?.deadline)}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-xs font-medium leading-6 text-gray-900"
                >
                  File
                </label>

                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
                      <input {...getInputProps()} />
                    </div>
                    {/* <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    /> */}
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
            onClick={(e) => handleSubmitFile(e)}
          >
            Submit Task
          </button>
        </div>
      </form>
      <Alert
        alertOpen={alertOpen}
        color="green"
        className={`max-w-screen-sm ${
          alertOpen ? "absolute" : "hidden"
        } bottom-10 right-10 z-10`}
        icon={<AiFillCheckCircle className="mt-px h-6 w-6" />}
        onClose={handleCloseAlert}
      >
        <Typography variant="h5" color="white">
          Success
        </Typography>
        <Typography color="white" className="mt-2 font-normal">
          You're doin Great Work
        </Typography>
      </Alert>
      {/* <img
        src="https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Math%2Fresources%2FContoh%20Image2.jpeg?alt=media&token=c9532247-3ce7-492c-acd9-60d83652eddb"
        alt=""
      /> */}
    </div>
  );
};

export default SubmitTaskPage;
