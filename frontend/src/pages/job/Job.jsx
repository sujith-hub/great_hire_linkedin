import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Job = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-2 p-5 rounded-md bg-white border border-grey-100">
      <div className="flex justify-between items-center mb-2 ">
        <p className="text-sm bg-violet-100 rounded-md p-1 text-[#0233f8] font-bold">
          Urgent Hiring
        </p>
        <div className="flex items-center justify-between">
          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
          </Button>
        </div>
      </div>
      <h3 className="text-lg font-semibold">Software Developer</h3>
      <div className="flex items-center justify-between gap-2 my-2">
      <div>
          Google - rating 4.5 <IoIosStar className="inline text-yellow-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Hyderabad</p>
        </div>
      </div>
      <div className="p-1 flex items-center w-full text-sm bg-blue-100 justify-center  text-blue-800  rounded-md">
        <div className="flex items-center gap-1">
          <AiOutlineThunderbolt  />
          <span>Typically responded in 1 day</span>
        </div>
      </div>
      <div className="text-sm flex flex-col space-y-2">
        <div className="flex gap-2 justify-between items-center">
          <div className="flex w-1/2">
            <p className="p-1 text-center w-full font-semibold text-gray-700 rounded-md bg-gray-200 ">
              20000-35000
            </p>
          </div>
          <div className="flex  w-1/2">
            <p className="p-1 w-full  font-semibold text-green-700 rounded-md bg-green-100 flex items-center justify-center gap-1 ">
              Full Time <FaHeart /> +1
            </p>
          </div>
        </div>
        <div className="w-full">
          <p className="p-1 text-center font-semibold text-gray-700 rounded-md bg-gray-200">
            Monday to Friday +1
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Active 2 days ago </p>
        </div>
        <div className="flex items-center text-sm text-blue-700 gap-2 cursor-pointer">
          <span className="text-black"
           onClick={() => {
            navigate("/apply");
          }}
          >Easy Apply</span>
          <IoMdSend  size={20} />
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-4 ">
        <Button
          onClick={() => navigate("/description/${jobId}")}
          variant="outline"
          className="w-full text-white bg-blue-700 hover:bg-blue-600 hover:text-white  "
        >
          Details
        </Button>
        
      </div>
    </div>
  );
};

export default Job;
