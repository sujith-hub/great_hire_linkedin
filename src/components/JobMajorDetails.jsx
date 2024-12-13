import React, { useState } from "react";
import { RiShareBoxFill } from "react-icons/ri";
import { BiDownArrowAlt } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";
import { HiLightBulb } from "react-icons/hi";
import { FaBookOpen } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";
import { PiMoneyWavyFill } from "react-icons/pi";
import { FaToolbox } from "react-icons/fa";
import { BsFlagFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const JobMajorDetails = ({
  selectedJob,
  onUpdateSkill,
  onUpdateEducation,
  onUpdateLanguage,
  onUpdateJob,
}) => {
  // const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  // const [currentEducationIndex, setCurrentEducationIndex] = useState(0);
  // const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const navigate = useNavigate();

  // const handleSkillSelection = (skill, status) => {
  //   onUpdateSkill(skill, status);
  //   if (currentSkillIndex < selectedJob.skills.length) {
  //     setCurrentSkillIndex(currentSkillIndex + 1);
  //   }
  // };

  // const handleEducationSelection = (edu, status) => {
  //   onUpdateEducation(edu, status);
  //   if (currentEducationIndex < selectedJob.educations.length) {
  //     setCurrentEducationIndex(currentEducationIndex + 1);
  //   }
  // };

  // const handleLanguageSelection = (lan, status) => {
  //   onUpdateLanguage(lan, status);
  //   if (currentLanguageIndex < selectedJob.languages.length) {
  //     setCurrentLanguageIndex(currentLanguageIndex + 1);
  //   }
  // };

  // const handleJobSelection = (status) => {
  //   onUpdateJob(status);
  // };

  return (
    <div>
      {/* profile insight */}
      <div className="p-4 flex flex-col justify-center gap-4 border-b-2 border-gray-200 ">
        <div>
          <h1 className="text-xl font-bold">Profile Insight</h1>
          {/* <p className="flex items-center gap-1 text-gray-500">
            Here’s how the job qualifications align with your profile{" "}
            <RiShareBoxFill />{" "}
          </p> */}
        </div>

        {/* Skills Section */}
        <div className="mt-2">
          <h3 className="text-xl text-gray-500 flex items-center gap-2">
            <HiLightBulb />
            <span className="text-xl font-bold text-black">Skills</span>
          </h3>
          {/* ${
                  skill.status === ""
                    ? "bg-slate-200"
                    : skill.status === "Yes"
                    ? "bg-green-200"
                    : "bg-red-200"
                } */}
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedJob?.skills.map((skill, index) => (
              <div
                key={index}
                className={`flex items-center w-fit p-1 rounded-lg bg-slate-200 gap-1 text-sm text-gray-800`}
              >
                <span className="font-bold">{skill.skill}</span>
                <span>{skill.required ? "(required)" : ""}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-4">
          <h3 className="text-xl text-gray-500 flex items-center gap-2">
            <FaBookOpen />
            <span className="text-xl font-bold text-black">Education</span>
          </h3>

          <div className="flex flex-wrap gap-2 mt-2">
            {selectedJob?.educations.map((education, index) => (
              <div
                key={index}
                className={`flex items-center w-fit p-1 rounded-lg bg-slate-200 gap-1 text-sm text-gray-800`}
              >
                <span className="font-bold">{education.edu}</span>
                <span>{education.required ? "(required)" : ""}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Language Section */}
        <div className="mt-4">
          <h3 className="text-xl text-gray-500 flex items-center gap-2">
            <GrLanguage />
            <span className="text-xl font-bold text-black">Languages</span>
          </h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {selectedJob?.languages.map((language, index) => (
              <div
                key={index}
                className={`flex items-center w-fit p-1 rounded-lg bg-slate-200  gap-1 text-sm text-gray-800`}
              >
                <span className="font-bold">{language.lan}</span>
                <span>{language.required ? "(required)" : ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job details */}
      <div className="p-4 flex flex-col justify-center gap-4 border-b-2 border-gray-200">
        <div>
          <h1 className="text-xl font-bold">Job details</h1>
          {/* <p className="flex items-center gap-1 text-gray-500">
            Here’s how the job details align with your profile{" "}
            <RiShareBoxFill />{" "}
          </p> */}
        </div>

        {/* Pay Section */}
        <div className="mt-2">
          <h3 className="text-xl text-gray-500 flex items-center gap-2">
            <PiMoneyWavyFill />
            <span className="text-xl font-bold text-black">Pay</span>
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center w-fit p-1 rounded-lg  bg-slate-200 gap-1 text-sm text-gray-800">
              <span className="font-bold">{selectedJob?.salary}</span>
            </div>
          </div>
        </div>
        
        {/* Experience Section */}
        <div className="mt-2">
          <h3 className="text-xl text-gray-500 flex items-center gap-2">
            <BsPersonWorkspace />
            <span className="text-xl font-bold text-black">Experience</span>
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center w-fit px-4 rounded-lg bg-slate-200 gap-1 text-sm text-gray-800">
              <span className="font-bold">{selectedJob?.experience} Years</span>
            </div>
          </div>
        </div>

        {/* Job Type section */}
        <div className="mt-4">
          <h3 className="text-xl text-gray-500 flex items-center gap-2">
            <FaToolbox />
            <span className="text-xl font-bold text-black">Job type</span>
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <div
              className={`flex items-center w-fit p-1 rounded-lg bg-slate-200 gap-1 text-sm text-gray-800`}
            >
              <span className="font-bold">{selectedJob?.jobType.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Job Description */}
      <div className="p-4 flex flex-col justify-center gap-4 border-b-2 border-gray-200">
      <h1 className="text-xl font-bold">Full Job Description</h1>
        <p className="font-semibold">
          Please Note: After the submission of your application, you will
          receive an email to complete a virtual interview via our online
          interviewing platform/tool, “Verint”. This online interview must be
          completed for prompt consideration of employment applications as it
          takes the place of an in-person/telephone interview. Work Location:
          This is work from office position for Navi Mumbai location. Build Your
          Future! Come join our thriving team as a Call Center Representative!
          We are seeking ambitious, self-motivated and driven people just like
          you for a rewarding career in the customer service arena.
        </p>
        <p>
          Make outbound contact to debtors regarding delinquent accounts and
          negotiates settlement/ Payment options. · Take inbound telephone calls
          from debtors regarding delinquent accounts and negotiates
          settlement/Payment options. · Update collection notes and change
          account statuses based on established procedures. · Research disputed
          delinquent account balances and makes necessary corrections. · Review
          collection up unit and changes account status based on established
          procedures. Review accounts to be recommended for closure and assists
          in report preparation. · Participate in regular meetings and
          communicates opportunities for process improvement. · All other duties
          as assigned.
        </p>
        <p>
          Previous legal collections experience a plus. · Previous collections,
          customer service, sales, or telemarketing experience required. ·
          Regular attendance and adherence to a set schedule required, which
          includes breaks and lunches. · Strong oral communication and
          interpersonal skills required. Must be an active listener. · Excellent
          computer navigation skills required. · Experience using automated
          dialers preferred.
        </p>
        <p className="font-semibold">
        This job description is not an exclusive or exhaustive list of all job functions that a team member in this position may be asked to perform. Duties and responsibilities can be changed, expanded, reduced, or delegated by management to meet the business needs of the company.
        </p>
      </div>

      {/* Benifits */}
      <div className="p-4 flex flex-col justify-center gap-4 border-b-2 border-gray-200">
        <h1 className="text-xl font-bold">Benifits</h1>
        <ul
          className="ml-6 text-sm text-gray-600 mt-2"
          style={{ listStyleType: "circle" }}
        >
          {selectedJob?.benifits?.map((benifit, index) => (
            <li key={index}>{benifit}</li>
          ))}
        </ul>
      </div>

      {/* Responsibilities */}
      <div className="p-4 flex flex-col justify-center gap-4 border-b-2 border-gray-200">
        <h1 className="text-xl font-bold">Responsibilities</h1>
        <ul
          className="ml-6 text-sm text-gray-600 mt-2"
          style={{ listStyleType: "circle" }}
        >
          {selectedJob?.responsibilities?.map((responsibilitie, index) => (
            <li key={index}>{responsibilitie}</li>
          ))}
        </ul>
      </div>

      {/* qualifications */}
      <div className="p-4 flex flex-col justify-center gap-4 border-b-2 border-gray-200">
        <h1 className="text-xl font-bold">Qualifications</h1>
        <ul
          className="ml-6 text-sm text-gray-600 mt-2"
          style={{ listStyleType: "circle" }}
        >
          {selectedJob?.qualifications?.map((qualification, index) => (
            <li key={index}>{qualification}</li>
          ))}
        </ul>
      </div>

      <div className="p-4">
        <button className="flex items-center gap-2 bg-gray-400 p-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/report-job/${selectedJob?.id}`)}>
          <BsFlagFill /> <span className="font-semibold">Report Job</span>
        </button>
      </div>
    </div>
  );
};

export default JobMajorDetails;
