import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import StudentPage from "./pages/StudentPage";
import SubjectPage from "./pages/SubjectPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddTaskPage from "./pages/AddTaskPage";
import AddUserPage from "./pages/AddUserPage";
import SubmitTaskPage from "./pages/SubmitTaskPage";
import Dashboard from "./pages/Dashboard";

import TeacherPage from "./pages/TeacherPage";
import ResourcePage from "./pages/ResourcePage";
import TaskStudentPage from "./pages/TaskStudentPage";
import TaskPage from "./pages/TaskPage";
import SubmissionPage from "./pages/SubmissionPage";
import LoginWinston from "./pages/LoginWinston";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginWinston />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="student" element={<StudentPage />} />
        <Route path="teacher" element={<TeacherPage />} />
        <Route path="resource" element={<ResourcePage />} />
        <Route path="task/:subject_id" element={<TaskPage />} />
        {/* Student */}
        <Route
          path="task/:subject_id/submitTask/:task_id"
          element={<SubmitTaskPage />}
        />
        {/* Teacher */}
        <Route path="task/addTask/:subject_id" element={<AddTaskPage />} />
        <Route
          path="task/:subject_id/submission/:task_id"
          element={<SubmissionPage />}
        />

        <Route path="subject" element={<SubjectPage />} />
        <Route path="submitTask" element={<SubmitTaskPage />} />
        <Route path="addUser" element={<AddUserPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
