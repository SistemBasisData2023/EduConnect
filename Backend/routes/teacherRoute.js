const express = require("express");
const {
  getAllTeachers,
  getTeacherBySubject,
  getAvailableTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

router.get("/", getAllTeachers);
router.get("/available", getAvailableTeacher);
router.get("/getTeacherBySubject/:name", getTeacherBySubject);

const TeacherRoute = router;
module.exports = TeacherRoute;
