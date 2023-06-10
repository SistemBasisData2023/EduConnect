import React, { useState } from "react";
import { Alert, Button, Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function AlertSuccess({
  alertOpen,
  setAlertOpen,
  handleShowAlert,
  handleCloseAlert,
  message,
}) {
  // const [alertOpen, setAlertOpen] = useState(true);

  // const handleShowAlert = () => {
  //   setAlertOpen(true);
  //   setTimeout(() => {
  //     setAlertOpen(false);
  //   }, 3000);
  // };

  // const handleCloseAlert = () => {
  //   setAlertOpen(false);
  // };

  return (
    <>
      {!alertOpen && (
        <Button color="green" className="absolute" onClick={handleShowAlert}>
          Show Alert
        </Button>
      )}
      <Alert
        alertOpen={alertOpen}
        color="green"
        className={`max-w-screen-sm ${
          alertOpen ? "absolute" : "hidden"
        } bottom-10 right-10 z-10"`}
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
  );
}
