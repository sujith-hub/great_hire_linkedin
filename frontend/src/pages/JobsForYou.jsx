import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosStar } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { MdBlock } from "react-icons/md";
import { IoMdLink } from "react-icons/io";
import { RiShareBoxFill } from "react-icons/ri";
import { BsFlagFill } from "react-icons/bs";
import JobMajorDetails from "./JobMajorDetails";
import { useNavigate } from "react-router-dom";
import { useJobDetails } from "../context/JobDetailsContext";

const JobsForYou = () => {
  const {
    jobs,
    selectedJob,
    setSelectedJob,
    updateSkillStatus,
    updateEducationStatus,
    updateLanguageStatus,
    updateJobStatus,
    changeBookmarkStatus,
    changeBlockStatus,
  } = useJobDetails(); // Access functions from context

  const navigate = useNavigate();
  const [isClickOnThreeDot, setClickOnThreeDot] = useState(false);

  // for bookmark job for particular user
  const handleBookmark = () => {};

  // for hide job for particular user
  const handleHiddenJob = () => {};

  useEffect(() => {
    // Set the initial selected job if it's not already set
    if (!selectedJob) {
      const defaultJob = jobs.find((job) => job.id === 1); // Find the job with id 1
      setSelectedJob(defaultJob); // Set default selected job
    }
  }, []);

  return (
    <div className="flex justify-center  mt-4 gap-4 h-screen sticky top-10 lg:px-6">
      {/* Job List */}
      <div
        className={`flex flex-col gap-4 w-full md:w-1/2  h-screen m-5 md:m-0  scrollbar-hide overflow-y-scroll  `}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`p-4 border-2 rounded-lg cursor-pointer hover:shadow-lg relative ${
              selectedJob?.id === job.id ? "border-blue-600" : "border-gray-400"
            }`}
            onClick={() => {
              setSelectedJob(job);

              // Navigate to JobView for small screens
              if (window.innerWidth < 768) {
                navigate("/jobview");
              }
            }}
          >
            <div className="flex justify-between items-center mb-2 ">
              <p className="text-sm bg-violet-100 rounded-md p-1 text-violet-800 font-bold">
                Urgent Hiring
              </p>
              <BsThreeDotsVertical
                onClick={() => setClickOnThreeDot(!isClickOnThreeDot)}
              />
              {selectedJob?.id === job.id && isClickOnThreeDot && (
                <div className="absolute top-10 right-2 border border-black rounded-lg p-2 flex-col justify-center gap-10 z-20 transform origin-left animate-slide-in-right">
                  <p className="p-2 flex gap-2 items-center text-gray-800 hover:bg-gray-200 rounded-lg">
                    <CiBookmark size={25} />
                    <span>Save job</span>
                  </p>
                  <p className="p-2 flex gap-2 items-center text-gray-800 hover:bg-gray-200 rounded-lg">
                    <MdBlock size={25} />
                    <span>Not interested</span>
                  </p>
                  <p
                    className="p-2 flex gap-2 items-center text-gray-800 hover:bg-gray-200 rounded-lg"
                    onClick={() => navigate(`/report-job/${selectedJob?.id}`)}
                  >
                    <BsFlagFill />
                    <span>Is there a problem with job?</span>
                  </p>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">
              {job.companyName} - {job.rating}{" "}
              <IoIosStar className="inline text-yellow-500" />
            </p>
            <p className="text-sm text-gray-500">{job.location}</p>

            <div className="p-1 flex items-center w-fit text-sm bg-blue-100 text-blue-800 mt-2 rounded-md">
              <AiOutlineThunderbolt className="mr-1" />
              <span>{job.respond}</span>
            </div>

            <div className="mt-2 text-sm flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="p-1 font-semibold text-gray-700 rounded-md bg-gray-200 ">
                  {job.salary}
                </p>
                <p className="p-1 font-semibold text-green-700 rounded-md bg-green-100 flex items-center gap-1 ">
                  {job.jobType.type} <FaHeart /> +1
                </p>
              </div>
              <p className="p-1 font-semibold text-gray-700 rounded-md bg-gray-200 w-fit mt-1">
                {job.duration} +1
              </p>
            </div>

            <div className="flex items-center text-sm text-blue-700 mt-2">
              <IoMdSend className="mr-1" size={20} />
              <span className="text-black">Easy Apply</span>
            </div>

            {/* Job details in circle bullets */}
            <ul
              className="ml-6 text-sm text-gray-600 mt-5"
              style={{ listStyleType: "circle" }}
            >
              {job.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>

            <div className="mt-2">
              <p className="text-sm text-gray-500">{job.activeDay}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Job Details */}
      {selectedJob && (
        <div className="md:flex flex-col border-2 border-gray-300 rounded-lg w-full md:w-1/2 hidden ">
          <div className="flex flex-col shadow-lg rounded-lg py-8 px-4">
            <h3 className="text-2xl font-semibold">{selectedJob?.title}</h3>
            <p className="text-sm text-gray-600 mt-2">
              {selectedJob?.companyName} - {selectedJob?.rating}{" "}
              <IoIosStar className="inline text-yellow-500" />
            </p>
            <p className="text-sm text-gray-500">{selectedJob?.location}</p>
            <p className="p-1  w-fit">{selectedJob?.salary}</p>

            <div className="p-1 flex items-center w-fit text-sm  text-blue-800">
              <AiOutlineThunderbolt className="mr-1" size={20} />
              <span className="text-gray-600">{selectedJob?.respond}</span>
            </div>

            <div className="flex items-center mt-3 gap-2">
              <div className="py-2 px-5 bg-blue-600 rounded-lg text-white hover:bg-blue-700">
                <button
                  className="flex items-center gap-1"
                  onClick={() => {
                    navigate("/apply");
                  }}
                >
                  Apply Now <RiShareBoxFill />
                </button>
              </div>
              <div
                className={`p-2 ${
                  selectedJob?.isBookmark ? "bg-green-200 " : "bg-gray-300 "
                }  rounded-lg text-gray-800 cursor-pointer`}
              >
                <CiBookmark size={25} onClick={() => changeBookmarkStatus()} />
              </div>
              <div
                className={`p-2 ${
                  selectedJob?.isBlock ? "bg-red-200 " : "bg-gray-300 "
                }  rounded-lg text-gray-800 cursor-pointer `}
              >
                <MdBlock size={25} onClick={() => changeBlockStatus()} />
              </div>
              <div className="p-2 bg-gray-300 rounded-lg text-gray-800 cursor-pointer">
                <IoMdLink size={25} />
              </div>
            </div>
          </div>

          <div className="overflow-y-scroll scrollbar-hide  h-screen">
            <JobMajorDetails
              selectedJob={selectedJob}
              onUpdateSkill={updateSkillStatus}
              onUpdateEducation={updateEducationStatus}
              onUpdateLanguage={updateLanguageStatus}
              onUpdateJob={updateJobStatus}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsForYou;
