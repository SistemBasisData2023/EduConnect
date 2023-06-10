import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function SubjectModal({
  open,
  setOpen,
  handleOpen,
  setEnrollInput,
  handleEnroll,
}) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleOpen = () => setOpen(!open);

  return (
    <React.Fragment>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Enroll to the Course</DialogHeader>
          <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input
              label="Enroll Code"
              onChange={(e) => setEnrollInput(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" color="green" onClick={handleEnroll}>
            Enroll
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
}
