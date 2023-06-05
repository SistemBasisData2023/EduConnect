import { Spinner } from "@material-tailwind/react";
import { LinearProgress } from "@mui/material";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-full w-full">
      <div>
        <LinearProgress />
      </div>
      {/* <div className="flex items-center justify-center w-full h-[70vh]">
        <Spinner className="h-16 w-16" />
      </div> */}
    </div>
  );
};

export default LoadingPage;
