const express = require("express");
const {
  createSubject,
  getSubjectByID,
  getSubjectByName,
  getAllSubjects,
  addStudent,
  getSubjectByStudent,
  createFeedback,
  calculateFeedbackScore,
} = require("../controllers/subjectControllers");
const upload = require("../config/multer");

const router = express.Router();

router.post("/create", upload.single("filename"), createSubject);
router.post("/addStudent", addStudent);
router.post("/addFeedback", createFeedback);

router.get("/calculate", calculateFeedbackScore);

router.get("/getSubjectByID/:id", getSubjectByID);
router.get("/getSubjectByName/:name", getSubjectByName);
router.get("/:student_id", getSubjectByStudent);
router.get("/", getAllSubjects);

const SubjectRoute = router;
module.exports = SubjectRoute;
