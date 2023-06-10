import { useContext, useEffect, useState } from "react";
import NewestTeacher from "../components/Dashboard/NewestTeacher";
import SubjectCard from "../components/Subject/SubjectCard";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import { Select, Option } from "@material-tailwind/react";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../components/Context/UserContext";
import SubjectModal from "../components/Subject/SubjectModal";

//React Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SubjectPage = () => {
  const { subject_id, setSubject_id, user } = useContext(UserContext);
  const [allSubjects, setallSubjects] = useState();
  const [subjects, setSubjects] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [option, setOption] = useState("My Courses");
  const navigate = useNavigate();

  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [enrollCode, setEnrollCode] = useState();
  const [enrollInput, setEnrollInput] = useState();

  //Toast
  const success = () => toast.success("Succesfully Enroll to the Course");
  const failed = () => toast.error("Failed to Enroll to the Course");

  const handleSubject = (id, enrollCode) => {
    const isIdExists = subjects.some((subject) => subject.id === id);
    //Set subject_id sesuai dengan yang di klik student
    //Jika Student memilih course yang sudah di enroll
    if (isIdExists) {
      setSubject_id(id);
      navigate(`/task/${id}`);
    } //Jika course belum di enroll
    else {
      //Open Modal
      setEnrollCode(enrollCode);
      console.log(enrollCode);
      handleOpen();
    }
  };

  const handleEnroll = () => {
    if (enrollInput === enrollCode) {
      //Maka Panggil API Enroll
      console.log("Memanggil API Enroll");
      addStudent();
      //Panggil Toast
      success();
    } else {
      //Close Modal
      failed();
    }
    //Reset seluruh nilai
    setEnrollCode("");
    setEnrollInput("");
    setOpen(false);
    setSubject_id("");
  };

  // const [student_id, setStudent_Id] = useState(
  //   "e36451d2-b778-4e42-b316-fbb2829974eb"
  // );
  // const [student_id, setStudent_Id] = useState(
  //   "e36451d2-b778-4e42-b316-fbb2829974eb"
  // );

  const isXL = useMediaQuery({ minWidth: 1140 });

  useEffect(() => {
    {
      user?.role === "Teacher" && navigate(`/task/${user.id}`); //Ubah sinih
    }
    getAllSubject();
    getSubjectByStudent();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isXL) {
      getSubjectByStudent();
      setOption("My Courses");
    }
  }, [isXL]);

  useEffect(() => {
    option === "All Courses" ? setSubjects(allSubjects) : getSubjectByStudent();
  }, [option]);

  const getAllSubject = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/subject/`);

      setallSubjects(data.data);
    } catch (error) {
      console.error("Error : " + error.message);
    }
  };

  const getSubjectByStudent = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/subject/${user.id}`
      );
      setSubjects(data.data);
      console.log("Nilai Subject kembali");
    } catch (error) {
      console.error("Error : " + error.message);
    }
  };

  const addStudent = async () => {
    try {
      const body = {
        student_id: user.id,
        subject_id: subject_id,
      };

      console.log(body);

      const { data } = await axios.post(
        `http://localhost:5000/subject/addStudent`,
        body
      );
      console.log(data.data);

      //Refetch subject
      getSubjectByStudent();
    } catch (error) {
      console.error("Error : " + error.message);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="grid  lg:grid-cols-1 xl:grid-cols-5 gap-10 max-w-[90rem] md:h-[90vh] h-screen px-3">
      <div
        className={`max-w-5xl min-h-[25rem]  mx-auto bg-white shadow-xl rounded-lg m-2 col-span-3 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-gray-50 ${
          user?.role === "Admin" && "hidden"
        }`}
      >
        <div className="flex justify-between items-center border-b p-5">
          <h1 className="text-xl font-bold leading-none text-gray-900">
            My Courses
          </h1>
          <div className="xl:hidden">
            <Select
              label="Select Version"
              value={option}
              onChange={(value) => setOption(value)}
            >
              <Option value="My Courses">My Courses</Option>
              <Option value="All Courses">All Courses</Option>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 cursor-pointer">
          {subjects?.map((subject) => (
            <div
              key={subject.id}
              className="p-5"
              onClick={() => handleSubject(subject.id, subject.enroll_code)}
            >
              <SubjectCard
                subjectName={subject?.name}
                teacherName={subject?.teacher_name}
              />
            </div>
          ))}
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
        </div>
        <div className="flex justify-between items-center border-t p-5"></div>
      </div>
      <div className="max-w-5xl min-h-[25rem] hidden xl:block mx-auto bg-white shadow-xl rounded-lg m-2 col-span-2 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-gray-50">
        <div className="flex justify-between items-center border-b p-5">
          <h1 className="text-xl font-bold leading-none text-gray-900">
            All Courses
          </h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-2 cursor-pointer">
          {allSubjects?.map((subject) => (
            <div
              key={subject.id}
              className="p-5"
              onClick={() => handleSubject(subject.id, subject.enroll_code)}
            >
              <SubjectCard
                subjectName={subject?.name}
                teacherName={subject?.teacher_name}
              />
            </div>
          ))}
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
        </div>
        <div className="flex justify-between items-center border-t p-5"></div>
      </div>
      <div
        className={`col-span-3 bg-white shadow-xl min-h-[25rem] m-2 rounded-lg ${
          user?.role === "Student" && "hidden"
        }`}
      >
        <div className="flex justify-between items-center border-b p-5">
          <h1 className="text-xl font-bold leading-none text-gray-900">
            Add Course
          </h1>
        </div>
      </div>

      <div className="">
        <SubjectModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          setEnrollInput={setEnrollInput}
          handleEnroll={handleEnroll}
        />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default SubjectPage;
