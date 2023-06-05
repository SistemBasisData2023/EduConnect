import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";

const SubjectCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    // Handle card click event
  };

  return (
    <div
      className={`max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="object-cover h-36 w-full"
        src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        alt="Course"
      />
      <div className="p-2">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Course Title</h2>
        <p className="text-gray-600 text-sm">Course Description</p>
        <div className="mt-2">
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1">
            Category
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
            Level
          </span>
        </div>
      </div>
      <div className="bg-gray-100 p-2">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
            alt="Instructor"
          />
          <div>
            <p className="text-gray-900 font-semibold text-sm">
              Instructor Name
            </p>
            <p className="text-gray-700 text-xs">Institution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
