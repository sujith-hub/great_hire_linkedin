import React, { useEffect, useState } from "react";
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
import { useJobDetails } from "@/context/JobDetailsContext";

const JobsForYou = ({ jobs }) => {
  const {
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
      const defaultJob = jobs.find(
        (job) => job._id === "678233e5103cc54b0fd68b2d"
      ); // Find the job with a specific ID
      setSelectedJob(defaultJob); // Set default selected job
    }
  }, [jobs]);

  

  const calculateActiveDays = (createdAt) => {
    const jobCreatedDate = new Date(createdAt); // Convert the 'createdAt' timestamp to a Date object
    const currentDate = new Date(); // Get the current date

    // Calculate the difference in time (in milliseconds)
    const timeDifference = currentDate - jobCreatedDate;

    // Convert time difference from milliseconds to days
    const activeDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Divide by the number of milliseconds in a day

    return activeDays;
  };

  return (
    <div className="flex justify-center mt-4 gap-4 h-screen sticky top-10 lg:px-6">
      {/* Job List */}
      <div
        className={`flex flex-col gap-4  w-full md:w-1/2 h-screen m-5 md:m-0 scrollbar-hide overflow-y-scroll`}
      >
        {jobs?.map((job) => (
          <div
            key={job._id}
            className={`p-4 border-2  rounded-lg cursor-pointer hover:shadow-lg relative flex flex-col space-y-2 ${
              selectedJob?._id === job._id
                ? "border-blue-600"
                : "border-gray-400"
            }`}
            onClick={() => {
              setSelectedJob(job);

              // Navigate to JobView for small screens
              if (window.innerWidth < 768) {
                navigate("/jobview");
              }
            }}
          >
            <div className="flex justify-between items-center">
              {job?.jobDetails?.urgentHiring && (
                <p className="text-sm bg-violet-100 rounded-md p-1 text-violet-800 font-bold">
                  Urgent Hiring
                </p>
              )}
              <BsThreeDotsVertical
                onClick={() => setClickOnThreeDot(!isClickOnThreeDot)}
              />
              {selectedJob?._id === job._id && isClickOnThreeDot && (
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
                    onClick={() => navigate(`/report-job/${selectedJob?._id}`)}
                  >
                    <BsFlagFill />
                    <span>Is there a problem with job?</span>
                  </p>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold">{job.jobDetails?.title}</h3>
            <p className="text-sm text-gray-600">
              {job.jobDetails?.companyName}
            </p>
            <p className="text-sm text-gray-500">{job.jobDetails?.location}</p>

            <div className="p-1 flex items-center w-fit text-sm bg-blue-100 text-blue-800 rounded-md">
              <AiOutlineThunderbolt className="mr-1" />
              <span>
                Typically Respond in {job.jobDetails?.respondTime} days
              </span>
            </div>

            <div className="text-sm flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="p-1 font-semibold text-gray-700 rounded-md bg-gray-200 ">
                  {job?.jobDetails?.salary
                    .replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, "$1,")
                    .split("-")
                    .map((part, index) => (
                      <span key={index}>
                        ₹{part.trim()}
                        {index === 0 ? " - " : ""}
                      </span>
                    ))}
                </p>
                <p className="p-1 font-semibold text-green-700 rounded-md bg-green-100 flex items-center gap-1 ">
                  {job.jobDetails?.jobType} <FaHeart /> +1
                </p>
              </div>
              <p className="p-1 font-semibold text-gray-700 rounded-md bg-gray-200 w-fit mt-1">
                {job.jobDetails?.duration} +1
              </p>
            </div>

            <div className="flex items-center text-sm text-blue-700">
              <IoMdSend className="mr-1" size={20} />
              <span className="text-black">Easy Apply</span>
            </div>

            {/* Job details in circle bullets */}
            <div
              className=" text-sm text-gray-400 flex flex-col font-semibold"
              style={{ listStyleType: "circle" }}
            >
              <span>{job.jobDetails?.benefits[0]},</span>
              <span>{job.jobDetails?.responsibilities[0]},</span>
              <span>{job.jobDetails?.qualifications[0]}</span>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Active {calculateActiveDays(job?.createdAt)} days ago
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Job Details */}
      {selectedJob && (
        <div className="md:flex flex-col border-2 border-gray-300 rounded-lg w-full md:w-1/2 hidden">
          <div className="flex flex-col shadow-lg rounded-lg py-8 px-4 space-y-2">
            <h3 className="text-2xl font-semibold">
              {selectedJob?.jobDetails?.title}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedJob?.jobDetails?.companyName}
            </p>
            <p className="text-sm text-gray-500">
              {selectedJob?.jobDetails?.location}
            </p>
            <p className="px-3 py-1 font-semibold text-gray-700 rounded-md w-fit bg-gray-200">
              {selectedJob?.jobDetails?.salary
                .replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, "$1,")
                .split("-")
                .map((part, index) => (
                  <span key={index}>
                    ₹{part.trim()}
                    {index === 0 ? " - " : ""}
                  </span>
                ))}
            </p>

            <div className="p-1 flex items-center w-fit text-sm text-blue-800 bg-blue-200">
              <AiOutlineThunderbolt className="mr-1" size={20} />
              <span className="text-blue-800">
                Typically Responds in {selectedJob?.jobDetails?.respondTime}{" "}
                days.
              </span>
            </div>

            <div className="flex items-center gap-2">
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
                } rounded-lg text-gray-800 cursor-pointer`}
              >
                <CiBookmark size={25} onClick={() => changeBookmarkStatus()} />
              </div>
              <div
                className={`p-2 ${
                  selectedJob?.isBlock ? "bg-red-200 " : "bg-gray-300 "
                } rounded-lg text-gray-800 cursor-pointer `}
              >
                <MdBlock size={25} onClick={() => changeBlockStatus()} />
              </div>
              <div className="p-2 bg-gray-300 rounded-lg text-gray-800 cursor-pointer">
                <IoMdLink size={25} />
              </div>
            </div>
          </div>

          <div className="overflow-y-scroll scrollbar-hide h-screen">
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
