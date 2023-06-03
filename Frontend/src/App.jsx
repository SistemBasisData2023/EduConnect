import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import SubjectPage from "./pages/SubjectPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddTaskPage from "./pages/AddTaskPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="subject" element={<SubjectPage />} />
        <Route path="task" element={<AddTaskPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
