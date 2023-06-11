import React, { useContext, useEffect } from "react";
import { UserContext } from "../components/Context/UserContext";
import TaskStudentPage from "./TaskStudentPage";
import TaskTeacherPage from "./TaskTeacherPage";
import LoadingPage from "./LoadingPage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// //React Toastify
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";

const TaskPage = () => {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const { subject_id } = useParams();
  console.log("Use Params TAsk : " + subject_id);

  const updateTaskStatus = async () => {
    try {
      await axios.put("http://localhost:5000/task/updateStatus");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateTaskStatus();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }
  console.log(user?.role);
  return user?.role === "Student" ? <TaskStudentPage /> : <TaskTeacherPage />;
};

export default TaskPage;
