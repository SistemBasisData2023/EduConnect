const express = require("express");
const {
  getAllStudent,
  getStudentByClassroom,
  getStudentBySubject,
} = require("../controllers/studentControllers");

const router = express.Router();

router.get("/", getAllStudent);
router.get("/getStudentByClassroom/:classroom_id", getStudentByClassroom);
router.get("/getStudentBySubject/:subject_name", getStudentBySubject);

const StudentRoute = router;
module.exports = StudentRoute;
