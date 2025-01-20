import React from "react";
import { Label } from "@/components/ui/label";

const JobDetail = ({ jobData }) => {
  if (!jobData) {
    return <p className="text-center text-gray-500 mt-10">Loading job details...</p>;
  }

  const {
    title,
    companyName,
    address,
    salaryRange,
    description,
    benefits,
    responsibilities,
    jobType,
    workingDays,
    openings,
    postedDate,
    qualifications,
    experience,
    skills,
  } = jobData;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Job Title and Overview */}
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <h5 className="text-sm text-gray-500 mt-1">{companyName}</h5>
          <h6 className="text-sm text-gray-500">{address}</h6>
          <h6 className="text-sm text-gray-700 font-medium mt-1">{salaryRange}</h6>
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Job Description:</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Benefits, Responsibilities, and Additional Details */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Benefits:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Responsibilities:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Details:</h3>
            <p className="text-sm text-gray-600">
              <strong>Job Type:</strong> {jobType}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Working Days:</strong> {workingDays}
            </p>
            <p className="text-sm text-gray-600">
              <strong>No. of Openings:</strong> {openings}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Posted Date:</strong> {postedDate}
            </p>
          </div>
        </div>

        {/* Job Requirements */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Job Requirements:</h2>
          <div className="space-y-4">
            {/* Qualifications */}
            <div>
              <Label className="font-bold text-gray-700">Qualifications:</Label>{" "}
              <span className="text-sm text-gray-600">{qualifications}</span>
            </div>

            {/* Experience */}
            <div>
              <Label className="font-bold text-gray-700">Experience:</Label>{" "}
              <span className="text-sm text-gray-600">{experience}</span>
            </div>

            {/* Skills */}
            <div>
              <Label className="font-bold text-gray-700">Skills:</Label>{" "}
              <span className="text-sm text-gray-600">{skills.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
