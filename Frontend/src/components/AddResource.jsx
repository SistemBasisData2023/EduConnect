import { UserContext } from "../components/Context/UserContext";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import AlertSuccess from "./AlertSuccess";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/24/solid";

export default function AddResource({
  open,
  setOpen,
  handleOpen,
  getAllResources,
}) {
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useContext(UserContext);

  //Alert
  const [alertOpen, setAlertOpen] = useState(false);

  const handleShowAlert = () => {
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 5000);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const addResource = async () => {
    try {
      const formData = new FormData();

      formData.append("filename", selectedFile);

      formData.append("fileName", fileName);
      formData.append("description", description);

      formData.append("subject_id", user.subject_id);
      console.log(formData);

      const { data } = await axios.post(
        `http://localhost:5000/resource/addResource`,
        formData,
        {
          Headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      getAllResources();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addResource();
    setOpen(false);
    setFileName("");
    setDescription("");
    handleShowAlert();
  };

  const handleFileChange = (e) => {
    console.log("Mengupload File");
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0, transition: { duration: 0.3 } }, // Mengatur durasi animasi menjadi 0.3 detik
          unmount: { scale: 0.9, y: -100, transition: { duration: 0.3 } },
        }}
      >
        <div class="relative w-full max-w-3xl mx-auto max-h-full ">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={handleOpen}
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Add New Resource
              </h3>
              <form class="space-y-6" action="#" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Resource Name
                  </label>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <Textarea
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    class="block w-full text-sm rounded-md p-2 text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    name="filename"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit Resource
                </button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
      {/* <AlertSuccess
        open={alertOpen}
        setOpen={setAlertOpen}
        handleShowAlert={handleShowAlert}
        handleCloseAlert={handleCloseAlert}
      /> */}

      <Alert
        alertOpen={alertOpen}
        color="green"
        className={`max-w-screen-sm ${
          alertOpen ? "absolute" : "hidden"
        } bottom-10 right-10 z-10`}
        icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
        onClose={handleCloseAlert}
      >
        <Typography variant="h5" color="white">
          Success
        </Typography>
        <Typography color="white" className="mt-2 font-normal">
          You're doin Great Work
        </Typography>
      </Alert>
    </>

    // <div className="">
    //   <button onClick={handleOpen}>Halo</button>

    //   <div
    //     class={`${
    //       open ? "absolute" : "hidden"
    //     } z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    //   >
    //     <div class="relative w-full max-w-md max-h-full">
    //       <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
    //         <button
    //           type="button"
    //           class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
    //           data-modal-hide="authentication-modal"
    //           onClick={handleOpen}
    //         >
    //           <svg
    //             aria-hidden="true"
    //             class="w-5 h-5"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               fill-rule="evenodd"
    //               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //               clipRule="evenodd"
    //             ></path>
    //           </svg>
    //           <span class="sr-only">Close modal</span>
    //         </button>
    //         <div class="px-6 py-6 lg:px-8">
    //           <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
    //             Sign in to our platform
    //           </h3>
    //           <form class="space-y-6" action="#">
    //             <div>
    //               <label
    //                 for="email"
    //                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //               >
    //                 Your email
    //               </label>
    //               <input
    //                 type="email"
    //                 name="email"
    //                 id="email"
    //                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    //                 placeholder="name@company.com"
    //               />
    //             </div>
    //             <div>
    //               <label
    //                 for="password"
    //                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //               >
    //                 Your password
    //               </label>
    //               <input
    //                 type="password"
    //                 name="password"
    //                 id="password"
    //                 placeholder="••••••••"
    //                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    //                 required
    //               />
    //             </div>
    //             <div class="flex justify-between">
    //               <div class="flex items-start">
    //                 <div class="flex items-center h-5">
    //                   <input
    //                     id="remember"
    //                     type="checkbox"
    //                     value=""
    //                     class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
    //                     required
    //                   />
    //                 </div>
    //                 <label
    //                   for="remember"
    //                   class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    //                 >
    //                   Remember me
    //                 </label>
    //               </div>
    //               <a
    //                 href="#"
    //                 class="text-sm text-blue-700 hover:underline dark:text-blue-500"
    //               >
    //                 Lost Password?
    //               </a>
    //             </div>
    //             <button
    //               type="submit"
    //               class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //             >
    //               Login to your account
    //             </button>
    //             <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
    //               Not registered?{" "}
    //               <a
    //                 href="#"
    //                 class="text-blue-700 hover:underline dark:text-blue-500"
    //               >
    //                 Create account
    //               </a>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
