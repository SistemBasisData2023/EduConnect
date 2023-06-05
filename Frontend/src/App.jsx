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
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="student" element={<StudentPage />} />
        <Route path="task" element={<TaskPage />} />
        <Route path="subject" element={<SubjectPage />} />
        <Route path="addTask" element={<AddTaskPage />} />
        <Route path="submitTask" element={<SubmitTaskPage />} />
        <Route path="addUser" element={<AddUserPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
