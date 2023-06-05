import React, { useState } from "react";
import PickDate from "../components/PickDate";
import AlertDialog from "../components/AlertDialog";
import { BsFillImageFill, BsCloudUpload } from "react-icons/bs";

const SubmitTaskPage = () => {
  const [open, setOpen] = useState();

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className=" max-w-4xl mx-5 sm:mx-auto my-12 p-5 bg-white shadow-xl rounded-lg ">
      <form className="text-black font-medium">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-900 border-b border-gray-900/10 pb-2">
              Perubahan Entalpi
            </h2>

            {/* <p className="mt-1 text-sm leading-6 text-gray-600 border-b border-gray-900/10 py-3">
              Task Name :{" "}
              <span className="text-black font-semibold">
                Perubahan Entalpi
              </span>
            </p> */}
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Task Description :
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
              error dolorum, reprehenderit atque non culpa eligendi id iste
              assumenda amet.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  File
                </label>

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
            Submit Task
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
        src="https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Math%2Fresources%2FContoh%20Image2.jpeg?alt=media&token=c9532247-3ce7-492c-acd9-60d83652eddb"
        alt=""
      /> */}
    </div>
  );
};

export default SubmitTaskPage;
