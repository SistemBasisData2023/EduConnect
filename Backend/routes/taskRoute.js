const express = require("express");
const {
  assignTask,
  submitTask,
  getAllTask,
  getActiveTask,
  getOverdueTask,
  getCompletedTask,
  getTaskBySubject,
  getTaskById,
  getTaskTeacher,
  getActiveTeacherTask,
  getOverdueTeacherTask,
  getTaskSubmission,
  addScore,
  updateTaskStatus,
} = require("../controllers/taskController");
const upload = require("../config/multer");
upload;

const router = express.Router();
//Admin
router.get("/", getAllTask);

//Teacher
router.get("/:task_id", getTaskById);
router.get("/getTaskTeacher/:subject_id", getTaskTeacher);
router.get("/Tactive/:subject_id", getActiveTeacherTask);
router.get("/Toverdue/:subject_id", getOverdueTeacherTask);
router.get("/submission/:task_id", getTaskSubmission);

router.post("/assign", upload.single("filename"), assignTask);
router.post("/submit", upload.single("filename"), submitTask);
router.post("/submission/addScore", addScore);
router.put("/updateStatus", updateTaskStatus);

//Student
router.get("/:subject_id/:student_id", getTaskBySubject);
router.get("/active/:subject_id/:student_id", getActiveTask);
router.get("/overdue/:subject_id/:student_id", getOverdueTask);
router.get("/completed/:subject_id/:student_id", getCompletedTask);

const TaskRoute = router;
module.exports = TaskRoute;
