const express = require("express");
const {
  createClassroom,
  getAllClassrooms,
} = require("../controllers/classroomControllers");

const router = express.Router();

router.post("/create", createClassroom);
router.get("/", getAllClassrooms);

const ClassroomRoute = router;
module.exports = ClassroomRoute;
