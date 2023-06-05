import React, { useState } from "react";

import { AiOutlineUser } from "react-icons/ai";
import { BsFillImageFill, BsCloudUpload } from "react-icons/bs";
import Header from "../components/Header";
import Datepicker from "react-tailwindcss-datepicker";
import PickDate from "../components/PickDate";
import AlertDialog from "../components/AlertDialog";

const AddTaskPage = () => {
  const [open, setOpen] = useState();

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className=" max-w-4xl mx-auto my-2 p-5 bg-white shadow-xl rounded-lg h-[88vh] overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
      <form className="text-black font-medium">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Task
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Task Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm sm:max-w-md">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full bg-white rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2 max-w-sm sm:max-w-md">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Deadline
                </label>
                <div className="border border-gray-300 shadow-sm rounded-lg">
                  <PickDate />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Task Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full  bg-white rounded-md border py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 ring-1 ring-inset ring-gray-300"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences for student
                </p>
              </div>

              {/* <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <AiOutlineUser
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div> */}

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  File
                </label>
                {/* <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <BsFillImageFill
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div> */}
                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <BsCloudUpload size={35} className="text-gray-500" />
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        PDF, PNG, JPG or ZIP (MAX. 5MB)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" />
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
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleClickOpen}
          >
            Add Task
          </button>
          <AlertDialog
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            title={""}
          />
        </div>
      </form>
      {/* <img
        src="https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Math%2Fresources%2FContoh%20Image.jpeg?alt=media&token=55c9b66e-c7aa-40df-b4fb-8b21faa1dbd0"
        alt=""
      /> */}
    </div>
  );
};

export default AddTaskPage;
