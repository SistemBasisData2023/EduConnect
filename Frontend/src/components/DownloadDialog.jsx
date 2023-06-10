import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const DownloadDialog = ({ downloadOpen, setDownloadOpen, url, toast }) => {
  //   const [open, setOpen] = useState(false);
  const handleOpen = () => setDownloadOpen(!downloadOpen);

  const handleDownload = () => {
    if (url) {
      window.open(url, "_blank");
      if (toast) {
        toast();
      }
    }
    setDownloadOpen(false);
  };

  return (
    <div>
      <Dialog open={downloadOpen} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Are You Sure you want to Download this file?
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <BellIcon className="h-16 w-16 text-red-500" />
          <Typography color="red" variant="h4">
            Download File ?
          </Typography>
          <Typography className="text-center font-normal">
            This file will automaticly be saved in your local computer
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={handleDownload}>
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DownloadDialog;
