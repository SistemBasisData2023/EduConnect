import NewestTeacher from "../components/Dashboard/NewestTeacher";
import SubjectCard from "../components/Subject/SubjectCard";

const SubjectPage = () => {
  return (
    // <div className="grid md:grid-cols-5 gap-3 max-w-[80rem] h-[85vh]">
    //   <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg m-5 col-span-3 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-gray-50">
    //     <div className="flex justify-between items-center border-b p-3">
    //       <h1 className="text-xl font-bold leading-none text-gray-900">
    //         Courses
    //       </h1>
    //     </div>
    //     <div className="grid grid-cols-3">
    //       <div className="col-span-1 p-5">
    //         <SubjectCard />
    //       </div>
    //       <div className="col-span-1 p-5">
    //         <SubjectCard />
    //       </div>
    //       <div className="col-span-1 p-5">
    //         <SubjectCard />
    //       </div>
    //       <div className="col-span-1 p-5">
    //         <SubjectCard />
    //       </div>
    //       <div className="col-span-1 p-5">
    //         <SubjectCard />
    //       </div>
    //       <div className="col-span-1 p-5">
    //         <SubjectCard />
    //       </div>
    //       <div className="col-span-1 p-5">
    //         <SubjectCard />
    //       </div>
    //     </div>
    //   </div>

    //   <div className="col-span-2 m-5">
    //     <NewestTeacher />
    //   </div>
    // </div>
    <div className="grid  lg:grid-cols-1   xl:grid-cols-5 gap-3 max-w-[80rem] h-[85vh] px-3">
      <div className="max-w-5xl min-h-[25rem]  mx-auto bg-white shadow-xl rounded-lg m-5 col-span-3 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-gray-50">
        <div className="flex justify-between items-center border-b p-5">
          <h1 className="text-xl font-bold leading-none text-gray-900">
            Courses
          </h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 cursor-pointer">
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
          <div className="p-5">
            <SubjectCard />
          </div>
        </div>
      </div>

      <div className="col-span-2 m-5 ">
        <NewestTeacher />
      </div>
    </div>
  );
};

export default SubjectPage;
