const express = require("express");
const { assignTask, submitTask } = require("../controllers/taskController");
const upload = require("../config/multer");
upload;

const router = express.Router();

router.post("/assign", upload.single("filename"), assignTask);
router.post("/submit", upload.single("filename"), submitTask);

const TaskRoute = router;
module.exports = TaskRoute;
