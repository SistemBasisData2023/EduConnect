import React, { useContext, useEffect } from "react";
import { UserContext } from "../components/Context/UserContext";
import TaskStudentPage from "./TaskStudentPage";
import TaskTeacherPage from "./TaskTeacherPage";
import LoadingPage from "./LoadingPage";
import { useNavigate, useParams } from "react-router-dom";

const TaskPage = () => {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const { subject_id } = useParams();
  console.log("Use Params TAsk : " + subject_id);

  useEffect(() => {}, []);

  if (isLoading) {
    return <LoadingPage />;
  }
  console.log(user?.role);
  return user?.role === "Student" ? <TaskStudentPage /> : <TaskTeacherPage />;
};

export default TaskPage;
