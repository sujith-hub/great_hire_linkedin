import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Job = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-grey-100">
      <div className="flex justify-between items-center mb-2 ">
        <p className="text-sm bg-violet-100 rounded-md p-1 text-[#0233f8] font-bold">
          Urgent Hiring
        </p>
        <div className='flex items-center justify-between'>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
        </div>
      </div>
      <h3 className="text-lg font-semibold">Software Developer</h3>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="" />
          </Avatar>
        </Button>
        <div>
          Google - rating 4.5 <IoIosStar className="inline text-yellow-500" />
          <p className="text-sm text-gray-500">Location</p>
        </div>
      </div>
      <div className="p-1 flex items-center w-fit text-sm bg-blue-100 text-blue-800 mt-2 rounded-md">
        <AiOutlineThunderbolt className="mr-1" />
        <span>Typically responded in 1 day</span>
      </div>
      <div className="mt-2 text-sm flex flex-col">
        <div className="flex gap-2 items-center">
          <p className="p-1 font-semibold text-gray-700 rounded-md bg-gray-200 ">
            20000-35000
          </p>
          <p className="p-1 font-semibold text-green-700 rounded-md bg-green-100 flex items-center gap-1 ">
            Full Time <FaHeart /> +1
          </p>
        </div>
        <p className="p-1 font-semibold text-gray-700 rounded-md bg-gray-200 w-fit mt-1">
          Monday to Friday +1
        </p>
      </div>
      <div className="flex items-center text-sm text-blue-700 mt-2">
        <IoMdSend className="mr-1" size={20} />
        <span className="text-black">Easy Apply</span>
      </div>

      {/* <ul
        className="text-sm text-gray-600 mt-5"
        style={{ listStyleType: "circle" }}
      > */}
        {/* {job.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))} */}
        {/* Previous collections, customer service sales, or telemarketing experience required. <br />
        Transport facility (As per policy and shift). <br />
        Comprehensive benefits package available: including medical insurance
      </ul> */}

      <div className="mt-2">
        <p className="text-sm text-gray-500">Active 2 days ago </p>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate("/description/${jobId}")}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#0233f8]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
