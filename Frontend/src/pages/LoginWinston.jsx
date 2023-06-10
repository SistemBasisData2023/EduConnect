import React from "react";
import UI from "../assets/library.png";
import { useState } from "react";

import { Link } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginWinston() {
  const [isRevealedPassword, setIsRevealedPassword] = useState(false);

  const { login } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const handlePasswordChange = (e) => {
    setIsRevealedPassword(e.target.value);
  };
  return (
    <body>
      <div
        className="bg-cover mx-auto w-screen flex h-screen flex-col justify-center px-[10%]"
        style={{ backgroundImage: `url(${UI})` }}
      >
        <form className="w-[50%] bg-black bg-opacity-30 border-blue-400 shadow-lg p-8 px-8 rounded-lg mx-auto">
          <h2 className="text-2xl dark:text-gray-300 font-bold text-center">
            SIGN IN
          </h2>
          <div className="flex flex-col text-white py-2">
            <label>Username</label>
            <input
              placeholder="username"
              className="p-2 bg-none border-x-0 border-t-0 border-solid border-white mt-2 p02 bg-transparent border-2 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-white py-2">
            <label>Password</label>
            <div className="relative">
              <input
                type={isRevealedPassword ? "text" : "password"}
                placeholder=""
                className="p-2 w-full mt-2 p02 bg-transparent border-solid border-x-0 border-t-0 border-b-2  focus:outline-none"
              />
              <span
                onClick={() => setIsRevealedPassword((prevState) => !prevState)}
                className=" icon absolute top-[50%] right-0 bg-transparent translate-y-[-25%]"
              >
                {!isRevealedPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </span>
            </div>
          </div>

          <div className="flex w-full justify-center mt-3">
            <button className="w-[25%] bg-blue-500 p-3 rounded-lg text-white">
              Sign in
            </button>
          </div>
        </form>

        {/* <div className="flex w-full mt-3 text-black">   
                            <a href="">Forgot Password?</a>
                        </div> */}

        <div className="flex w-full mt-3">
          {/* <Link to='/Register' className="text-sm font-light text-black dark:text-blue-600">
                                Don't have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here!</a>
                            </Link> */}
        </div>
      </div>
    </body>
  );
}
