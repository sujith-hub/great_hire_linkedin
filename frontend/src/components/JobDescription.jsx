import React from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = false;
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">Title</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                {" "}
                Positions
              </Badge>
              <Badge className={"text-[#F83002] font-bold"} variant="ghost">
                jobType
              </Badge>
              <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
                salaryLPA
              </Badge>
            </div>
          </div>
          <Button
            disbled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5209b0]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-grey-300 font-medium py-4">Job Description</h1>
        <div className="my-4">
            <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">Backend Dveloper</span></h1>
            <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">New Delhi</span></h1>
            <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800"></span></h1>
            <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">2 yrs</span></h1>
            <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">8 LPA</span></h1>
            <h1 className="font-bold my-1">Total Application: <span className="pl-4 font-normal text-gray-800"></span></h1>
            <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">07-12-2024</span></h1>
        </div>
      </div>
    </div>  
  );
};

export default JobDescription;
