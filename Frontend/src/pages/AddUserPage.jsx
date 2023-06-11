import React, { useEffect, useState } from "react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import axios from "axios";

//React Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const [classrooms, setClassrooms] = useState();
  const [subjects, setSubjects] = useState();

  //Form State
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [nomorInduk, setNomorInduk] = useState("");
  const [age, setAge] = useState("");

  const [role, setRole] = useState("");
  const [classroomId, setClassroomId] = useState("");

  //Toast
  const success = () => toast.success(`Create Successfull`);
  const failed = () => toast.error(`Please Select Valid Role`);
  const failedClass = () => toast.error(`Failed to Create a New Classroom`);

  //react router
  const navigate = useNavigate();

  const handleTabChange = () => {
    setFullName("");
    setUsername("");
    setPassword("");
    setNomorInduk("");
    setAge("");
    setRole("");
    setClassroomId("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register();
  };

  const handleClassroom = (e) => {
    e.preventDefault();
    createClassroom();
  };

  //API Create Class
  const createClassroom = async () => {
    try {
      const body = {
        name: username,
      };

      console.log("Creating classroom");
      console.log(body);
      await axios.post(`http://localhost:5000/classroom/create`, body);

      success();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      failedClass();
    }
  };

  //API Get All Classroom
  const getAllClassrooms = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/classroom/");
      setClassrooms(data.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  //API Get All Subject
  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/subject/`);

      setSubjects(data.data);
      // setIsLoading(false);
      console.log("Dipanggil Bwang");
    } catch (error) {
      console.error("Error : " + error.message);
      // setIsLoading(false);
    }
  };

  //API Register User
  const register = async () => {
    let body;
    try {
      if (role === "Admin") {
        body = {
          username: username,
          password: password,
          role: role,
        };
      } else if (role === "Student") {
        body = {
          username: username,
          password: password,
          role: role,
          name: fullName,
          age: age,
          nomor_induk_siswa: nomorInduk,
          classroom_id: classroomId,
        };
      } else if (role === "Teacher") {
        body = {
          username: username,
          password: password,
          role: role,
          name: fullName,
          age: age,
          nomor_induk_guru: nomorInduk,
          classroom_id: classroomId,
        };
      } else {
        //Call Toast
        failed();
        return;
      }

      console.log(body);
      await axios.post(`http://localhost:5000/auth/register`, body);
      success();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error : " + error.message);
    }
  };

  useEffect(() => {
    getAllSubjects();
    getAllClassrooms();
  }, []);

  return (
    /* h-[90vh] flex justify-center items-center */
    <div className="mx-3 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-gray-50 h-[90vh]">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl my-12 p-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Add User
        </h2>
        <p className="my-1 text-sm leading-6 text-gray-600">Choose User Role</p>

        <Tabs value="html">
          <TabsHeader>
            <Tab
              key={"admin"}
              value={"admin"}
              onClick={() => handleTabChange()}
            >
              Admin
            </Tab>
            <Tab
              key={"student"}
              value={"student"}
              onClick={() => handleTabChange()}
            >
              Student
            </Tab>
            <Tab
              key={"teacher"}
              value={"teacher"}
              onClick={() => handleTabChange()}
            >
              Teacher
            </Tab>
            <Tab
              key={"classroom"}
              value={"classroom"}
              onClick={() => handleTabChange()}
            >
              Classroom
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel key={"admin"} value={"admin"}>
              <form className="" onSubmit={(e) => handleRegister(e)}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Username
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            type="password"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <div className="flex-1 items-center justify-center sm:text-center">
                          <label
                            htmlFor="country"
                            className="text-sm font-medium leading-6 text-gray-900"
                          >
                            Role
                          </label>

                          <div className="mt-2">
                            <select
                              className="block mx-auto w-full bg-white rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-sm sm:text-sm sm:leading-6"
                              onChange={(e) => setRole(e.target.value)}
                              value={role}
                            >
                              <option value={""}>Select Role</option>
                              <option value={"Admin"}>Admin</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </TabPanel>
            <TabPanel key={"student"} value={"student"}>
              <form className="" onSubmit={(e) => handleRegister(e)}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Username
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            type="password"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nomor Induk
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={nomorInduk}
                            onChange={(e) => setNomorInduk(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Age
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Role
                        </label>
                        <div className="mt-2">
                          <select
                            className="block mx-auto w-full bg-white rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-sm md:max-w-xl sm:text-sm sm:leading-6"
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                          >
                            <option value={""}>Select Role</option>
                            <option value={"Student"}>Student</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Classroom
                        </label>
                        <div className="mt-2">
                          <select
                            className="block w-full bg-white rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-sm sm:text-sm md:max-w-xl sm:leading-6"
                            value={classroomId}
                            onChange={(e) => setClassroomId(e.target.value)}
                          >
                            <option value={""}>Select Classroom</option>
                            {classrooms?.map((classroom) => (
                              <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </TabPanel>
            <TabPanel key={"teacher"} value={"teacher"}>
              <form className="" onSubmit={(e) => handleRegister(e)}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Username
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            type="password"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nomor Induk
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={nomorInduk}
                            onChange={(e) => setNomorInduk(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Age
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Role
                        </label>
                        <div className="mt-2">
                          <select
                            className="block mx-auto w-full bg-white rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-sm md:max-w-xl sm:text-sm sm:leading-6"
                            defaultValue={"Select Role"}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value={""}>Select Role</option>
                            <option value={"Teacher"}>Teacher</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Course
                        </label>
                        <div className="mt-2">
                          <select
                            className="block w-full bg-white rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-sm sm:text-sm md:max-w-xl sm:leading-6"
                            value={classroomId}
                            onChange={(e) => setClassroomId(e.target.value)}
                          >
                            <option value={""}>Select Classroom</option>
                            {classrooms?.map((classroom) => (
                              <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </TabPanel>
            <TabPanel key={"classroom"} value={"classroom"}>
              <form className="" onSubmit={(e) => handleClassroom(e)}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Add New Classroom
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Please enter your new classroom name
                    </p>
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Classroom
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-w-md"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
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
  );
};

export default AddUserPage;
