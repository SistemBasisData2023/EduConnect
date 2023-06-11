import { Fragment, useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Rating,
} from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { BsFillStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context/UserContext";

const RatingDialog = ({
  ratingOpen,
  setRatingOpen,
  url,
  toast,
  submitRate,
}) => {
  //Global State
  const { user } = useContext(UserContext);

  const [rated, setRated] = useState(0);
  const handleOpen = (event) => {
    event.stopPropagation();
    setRatingOpen(!ratingOpen);
  };
  const handleRating = (event) => {
    //Handle
    event.stopPropagation();
    submitRate(rated);
    setRatingOpen(false);
  };

  const handleRatingInput = (value) => {
    setRated(value);
  };

  return (
    <div>
      <Dialog open={ratingOpen} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Give Feedback Rating
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <BsFillStarFill className="h-16 w-16 text-yellow-500" />
          <Typography color="gray" variant="h4">
            Rating
          </Typography>

          <div className="flex items-center gap-2 ">
            <Rating
              value={rated}
              onChange={(value) => handleRatingInput(value)}
              onClick={(event) => event.stopPropagation()}
            />
            <Typography color="blue-gray" className="font-medium">
              {rated}.0 Rated
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={handleRating}>
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default RatingDialog;
