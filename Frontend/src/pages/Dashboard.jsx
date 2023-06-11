import { useContext } from "react";
import BlogCard from "../components/Dashboard/BlogCard";
import CallToAction from "../components/Dashboard/CallToAction";
import Jumbotron from "../components/Dashboard/Jumbotron";
import NewestTeacher from "../components/Dashboard/NewestTeacher";

import TopCards from "../components/Dashboard/TopCards";
import { UserContext } from "../components/Context/UserContext";
import SpeedDialComp from "../components/SpeedDialComp";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-gray-50 h-[90vh]">
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-3 p-5">
          {/* <NewestTeacher /> */}
          <TopCards />
        </div>
        <div className="col-span-2 p-5">
          {/* <NewestTeacher /> */}
          <TopCards />
        </div>
        <div className="col-span-2 p-5">
          {/* <NewestTeacher /> */}
          <TopCards />
        </div>
        <div className="col-span-3 p-5">
          <NewestTeacher />
        </div>
      </div>
      {/* <Jumbotron /> */}
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2 p-5"></div>
        <div className="col-span-2 p-5">
          <CallToAction />
        </div>
      </div>
      <div className={`${user?.role === "Admin" ? "" : "hidden"}`}>
        <SpeedDialComp />
      </div>
    </div>
  );
};

export default Dashboard;
