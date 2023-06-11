import { useContext, useEffect, useState } from "react";
import NewestTeacher from "../components/Dashboard/NewestTeacher";
import SubjectCard from "../components/Subject/SubjectCard";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import { Select, Option } from "@material-tailwind/react";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../components/Context/UserContext";
import SubjectModal from "../components/Subject/SubjectModal";
import PickDate from "../components/PickDate";

//React Icons
import {
  AiOutlineFilePdf,
  AiOutlineFileZip,
  AiOutlineFileJpg,
  AiFillCheckCircle,
} from "react-icons/ai";
import {
  BsFillImageFill,
  BsCloudUpload,
  BsFiletypeTxt,
  BsFiletypePng,
} from "react-icons/bs";

//React Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//Dropzone
import { useDropzone } from "react-dropzone";
import SpeedDialComp from "../components/SpeedDialComp";

const SubjectPage = () => {
  const { subject_id, setSubject_id, user } = useContext(UserContext);
  const [allSubjects, setallSubjects] = useState();
  const [subjects, setSubjects] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [option, setOption] = useState("My Courses");
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [enrollCode, setEnrollCode] = useState();
  const [enrollInput, setEnrollInput] = useState();

  //Form
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [enroll_form, setEnroll_Form] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacher_id, setTeacher_id] = useState("");

  //Toast
  const success = () => toast.success("Succesfully Enroll to the Course");
  const addCourseSuccess = () => toast.success("Succesfully Adding Course");
  const addRatingSuccess = () => toast.success("Succesfully Adding Rating");
  const addRatingFailed = (message) => toast.error(message);
  const failed = () => toast.error("Failed to Enroll to the Course");

  //Dropzone and File Handle
  const onDrop = (acceptedFiles) => {
    // Lakukan operasi dengan file yang diterima
    console.log(acceptedFiles[0]);
    let newFile = acceptedFiles[0];
    setFile(newFile);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

  //HandleClick
  const handleCreateCourse = (e) => {
    e.preventDefault();
    addCourse();
  };

  const getFileIcon = () => {
    const extension = file.name.split(".").pop();
    if (extension === "pdf") {
      return <AiOutlineFilePdf size={24} />;
    } else if (extension === "zip") {
      return <AiOutlineFileZip size={24} />;
    } else if (extension === "jpg") {
      return <AiOutlineFileJpg size={24} />;
    } else if (extension === "png") {
      return <BsFiletypePng size={24} />;
    }

    return <BsFiletypeTxt size={24} />;
  };

  const getAvailableTeacher = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/teacher/available`
      );

      setTeachers(data.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const addCourse = async () => {
    try {
      const formData = new FormData();

      //Get data from Form
      formData.append("filename", file);
      formData.append("name", fileName);
      formData.append("teacher_id", teacher_id);
      formData.append("enroll_code", enroll_form);
      console.log(formData);

      // Call API
      const { data } = await axios.post(
        `http://localhost:5000/subject/create`,
        formData,
        {
          Headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //Reset State
      setTeacher_id("");
      setEnroll_Form("");
      setFileName("");
      setFile(null);

      await getAvailableTeacher();
      await getAllSubject();
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        //Toast
        addCourseSuccess();
      }, 2000);
    } catch (error) {
      console.error(error);
      failed();
    }
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
    getAvailableTeacher();
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
      setIsLoading(false);
      console.log("Dipanggil Bwang");
    } catch (error) {
      console.error("Error : " + error.message);
      setIsLoading(false);
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
              // onClick={() => handleSubject(subject.id, subject.enroll_code)}
            >
              <SubjectCard
                subjectName={subject?.name}
                teacherName={subject?.teacher_name}
                subjectImg={subject?.image_url}
                subjectId={subject?.id}
                subjectEnrollCode={subject?.enroll_code}
                feedbackScore={subject?.feedback_score}
                toastSuccess={addRatingSuccess}
                toastFailed={addRatingFailed}
                refetchMyCourses={getSubjectByStudent}
                refetchAllCourses={getAllSubject}
                handleSubject={handleSubject}
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
      <div
        className={`max-w-5xl min-h-[25rem] hidden xl:block mx-auto bg-white shadow-xl rounded-lg m-2 ${
          user?.role === "Student" ? "col-span-2" : "col-span-3"
        }  overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-gray-50`}
      >
        <div className="flex justify-between items-center border-b p-5">
          <h1 className="text-xl font-bold leading-none text-gray-900">
            All Courses
          </h1>
        </div>
        <div
          className={`grid grid-cols-2 ${
            user?.role === "Student" ? "lg:grid-cols-2" : "lg:grid-cols-3"
          }   cursor-pointer`}
        >
          {allSubjects?.map((subject) => (
            <div
              key={subject.id}
              className="p-5"
              onClick={() => handleSubject(subject.id, subject.enroll_code)}
            >
              <SubjectCard
                subjectName={subject?.name}
                teacherName={subject?.teacher_name}
                subjectImg={subject?.image_url}
                subjectId={subject?.id}
                subjectEnrollCode={subject?.enroll_code}
                feedbackScore={subject?.feedback_score}
                toastSuccess={addRatingSuccess}
                toastFailed={addRatingFailed}
                refetchMyCourses={getSubjectByStudent}
                refetchAllCourses={getAllSubject}
                handleSubject={handleSubject}
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
        className={`col-span-2  min-h-[25rem] m-2 rounded-lg ${
          user?.role === "Student" && "hidden"
        }`}
      >
        {/* <div className="flex justify-between items-center border-b p-5">
          <h1 className="text-xl font-bold leading-none text-gray-900">
            Add Course
          </h1>
        </div> */}
        <div className=" max-w-4xl mx-auto my-2 p-5 bg-white shadow-xl rounded-lg  overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 h-screen md:h-[80vh]">
          <form className="text-black font-medium">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="flex justify-between">
                  <div className="">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Add Course
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>
                  </div>

                  {/* <h2 className="text-base font-semibold leading-7 text-gray-900 text md:mr-20">
                Chemistry
              </h2> */}
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Course Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full px-2 bg-white rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                          onChange={(e) => setFileName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Course Enroll Code
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full px-2 bg-white rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                          onChange={(e) => setEnroll_Form(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="Teacher"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Select Teacher
                    </label>
                    <Select
                      onChange={(value) => setTeacher_id(value)} //snih
                    >
                      {teachers.map((teacher) => (
                        <Option key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Course Photo :
                    </label>

                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div
                          {...getRootProps()}
                          className={`dropzone ${
                            isDragActive ? "active" : ""
                          } w-full h-full flex justify-center items-center`}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <BsCloudUpload
                              size={35}
                              className="text-gray-500"
                            />
                            <p
                              className={`mb-2 text-sm text-gray-500 dark:text-gray-400 ${
                                file ? "hidden" : ""
                              }`}
                            >
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p
                              className={`text-xs text-gray-500 dark:text-gray-400 ${
                                file ? "hidden" : ""
                              }`}
                            >
                              PDF, PNG, JPG or ZIP (MAX. 5MB)
                            </p>
                            <div className="flex gap-1 items-center text-gray-500">
                              {file && (
                                <div className="text-red-500">
                                  {getFileIcon(file)}
                                </div>
                              )}
                              <p className="text-md text-gray-500 dark:text-gray-400">
                                {file?.name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <input {...getInputProps()} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleCreateCourse}
              >
                Add Course
              </button>
            </div>
          </form>

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
      <div className={`${user?.role === "Admin" ? "" : "hidden"}`}>
        <SpeedDialComp handleOpen={handleOpen} addMessage={""} />
      </div>
    </div>
  );
};

export default SubjectPage;
