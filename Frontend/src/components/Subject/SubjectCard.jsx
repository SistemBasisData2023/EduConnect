import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import RatingDialog from "../RatingDialog";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

const SubjectCard = (props) => {
  const { user } = useContext(UserContext);

  const [isHovered, setIsHovered] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const handleCardClick = () => {
    // Handle card click event
  };

  const handleFeedbackClick = (event) => {
    event.stopPropagation();
    console.log("Feedback span clicked");
    // Perform the desired action for category span
    setRatingOpen(!ratingOpen);
  };

  // const handleSubmitRate = (score) => {
  //   //Call Rating API
  //   submitRate(score);
  // };

  const submitRate = async (score) => {
    const body = {
      student_id: user.id,
      score: score,
      subject_id: props.subjectId,
    };
    try {
      await axios.post(`http://localhost:5000/subject/addFeedback`, body);

      await updateFeedbackRate();
      props.toastSuccess();
      //Refetch
      await props.refetchMyCourses();
      await props.refetchAllCourses();
    } catch (error) {
      console.error(
        error.response?.data.message
          ? error.response.data.message
          : error.message
      );
      props.toastFailed(error.response?.data.message);
    }
  };

  const updateFeedbackRate = async () => {
    try {
      await axios.get(`http://localhost:5000/subject/calculate`);
    } catch (error) {
      console.error(
        error.response.data.message ? error.response.data.message : error
      );
    }
  };

  return (
    <div
      className={`max-w-[12rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105`}
      onClick={() =>
        props.handleSubject(props.subjectId, props.subjectEnrollCode)
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="object-cover h-36 w-full"
        src={`${
          props.subjectImg
            ? props.subjectImg
            : "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        } `}
        alt="Course"
      />
      <div className="p-2">
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {props?.subjectName || "Course Title"}
        </h2>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="mt-2">
          <span
            onClick={handleFeedbackClick}
            className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1"
          >
            Feedback
          </span>
          <span
            onClick={(event) => event.stopPropagation()}
            className="inline-block bg-green-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700"
          >
            {`Rating : ${props?.feedbackScore ? props.feedbackScore : "0"} / 5`}
          </span>
        </div>
      </div>
      <div className="bg-gray-100 p-2">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src={`https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1686479056~exp=1686479656~hmac=6878abd4309736803fe8aa3c49d0ed33a6e2d716891039b6efe025b384fa04e6`}
            alt="Instructor"
          />
          <div>
            <p className="text-gray-900 font-semibold text-sm">
              {props?.teacherName || "Instructor Name"}
            </p>
            <p className="text-gray-700 text-xs">Institution</p>
          </div>
        </div>
      </div>
      <RatingDialog
        ratingOpen={ratingOpen}
        setRatingOpen={setRatingOpen}
        subjectId={props.subjectId}
        submitRate={submitRate}
      />
    </div>
  );
};

export default SubjectCard;
