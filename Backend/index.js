const dotenv = require("dotenv");
dotenv.config();
const { connectToDB } = require("./config/connectToDatabase");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./routes/authRoute");
const ClassroomRoute = require("./routes/classroomRoute");
const SubjectRoute = require("./routes/subjectRoute");
const StudentRoute = require("./routes/studentRoute");
const TeacherRoute = require("./routes/teacherRoute");
const ResourceRoute = require("./routes/resourceRoute");

const TaskRoute = require("./routes/taskRoute");

const app = express();
const PORT = 5000;

//Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5000", "http://localhost:5173"],
  })
);
app.use(cookieParser());

//Connecting To The Database
connectToDB();

//Routes
app.use("/auth", AuthRoute);
app.use("/classroom", ClassroomRoute);
app.use("/subject", SubjectRoute);
app.use("/student", StudentRoute);
app.use("/teacher", TeacherRoute);
app.use("/resource", ResourceRoute);
app.use("/task", TaskRoute);

app.listen(PORT, () => console.log("Listening to Port " + PORT));
