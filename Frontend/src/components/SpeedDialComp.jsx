import React, { useContext, useEffect, useState } from "react";

import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "@mui/material";
import { UserContext } from "./Context/UserContext";
import { useNavigate } from "react-router-dom";
import { BiTask } from "react-icons/bi";

const SpeedDialComp = ({ handleOpen, addMessage, icon }) => {
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        user?.role === "Student" ? "hidden" : "absolute"
      } bottom-7 right-10`}
    >
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton size="lg" className="rounded-full">
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
          <SpeedDialAction className="relative">
            <HomeIcon
              onClick={() => navigate("/dashboard")}
              className="h-5 w-5"
            />
            <Typography {...labelProps} onClick={() => navigate("/dashboard")}>
              Home
            </Typography>
          </SpeedDialAction>
          <SpeedDialAction className={`${addMessage ? "relative" : "hidden"}`}>
            <CogIcon className="h-5 w-5" onClick={() => handleOpen()} />
            <Typography onClick={() => handleOpen()} {...labelProps}>
              {addMessage}
            </Typography>
          </SpeedDialAction>
          <SpeedDialAction
            className={`${user?.role === "Admin" ? "relative" : "hidden"}`}
          >
            <Square3Stack3DIcon
              className="h-5 w-5"
              onClick={() => navigate("/addUser")}
            />
            <Typography onClick={() => navigate("/addUser")} {...labelProps}>
              Add User
            </Typography>
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
};

export default SpeedDialComp;
