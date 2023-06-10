const express = require("express");
const {
  getAllStudent,
  getStudentByClassroom,
  getStudentBySubject,
  getAllMockData,
} = require("../controllers/studentControllers");

const router = express.Router();

router.get("/", getAllStudent);
router.get("/Mock", getAllMockData);
router.get("/getStudentByClassroom/:classroom_name", getStudentByClassroom);
router.get("/getStudentBySubject/:subject_name", getStudentBySubject);

const StudentRoute = router;
module.exports = StudentRoute;
