const express = require("express");
const {
  createSubject,
  getSubjectByID,
  getSubjectByName,
  getAllSubjects,
  addStudent,
  getSubjectByStudent,
} = require("../controllers/subjectControllers");

const router = express.Router();

router.post("/create", createSubject);
router.post("/addStudent", addStudent);

router.get("/getSubjectByID/:id", getSubjectByID);
router.get("/getSubjectByName/:name", getSubjectByName);
router.get("/:student_id", getSubjectByStudent);
router.get("/", getAllSubjects);

const SubjectRoute = router;
module.exports = SubjectRoute;
