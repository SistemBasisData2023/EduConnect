const dotenv = require("dotenv");
dotenv.config();
const { connectToDB } = require("./config/connectToDatabase");
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//Firebase
const firebase = require("firebase/app");
const admin = require("firebase-admin");
//Firebase
const AuthRoute = require("./routes/authRoute");
const ClassroomRoute = require("./routes/classroomRoute");
const SubjectRoute = require("./routes/subjectRoute");
const StudentRoute = require("./routes/studentRoute");
const TeacherRoute = require("./routes/teacherRoute");
const ResourceRoute = require("./routes/resourceRoute");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const TaskRoute = require("./routes/taskRoute");

// const firebaseConfig = {
//   apiKey: "AIzaSyDkwXdFR7Nn7mC85K-7l2TImshYVzmrhTo",
//   authDomain: "myfirststorage-1caa0.firebaseapp.com",
//   projectId: "myfirststorage-1caa0",
//   storageBucket: "myfirststorage-1caa0.appspot.com",
//   messagingSenderId: "698234256985",
//   appId: "1:698234256985:web:3246de9f542802a96cfb48",
//   measurementId: "G-8TLXRBBP43",
// };

// firebase.initializeApp(firebaseConfig);

const app = express();
const PORT = 5000;

//Middleware
app.use(express.json());
app.use(cors());
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
