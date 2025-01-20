import React from "react";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";

const JobDescription = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
          {/* Job Title and Overview */}
          <div className="border-b pb-4 mb-6 flex justify-between items-center">
            {/* Left Section */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Fullstack Developer
              </h1>
              <h5 className="text-sm text-gray-500 mt-1">Company Name</h5>
              <h6 className="text-sm text-gray-500">Address</h6>
              <h6 className="text-sm text-gray-700 font-medium mt-1">
                3LPA - 5LPA
              </h6>
            </div>

            {/* Right Section - Apply Now Button */}
            <button
              onClick={() => {
                navigate("/apply");
              }}
              className="bg-blue-700 text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Apply Now
            </button>
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Job Description:
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We are seeking a highly skilled and motivated Backend Developer to
              join our dynamic team. The ideal candidate will be responsible for
              creating and maintaining server-side application logic, ensuring
              high performance and responsiveness to requests from the front
              end. You will work closely with front-end developers, architects,
              and stakeholders to build scalable and robust applications.
            </p>
          </div>

          {/* Benefits, Responsibilities, and Additional Details */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Benefits:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Flexible working hours</li>
                <li>Opportunity to work with a highly collaborative team</li>
                <li>Learning and development budget</li>
                <li>Health and wellness benefits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Responsibilities:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Develop and maintain website</li>
                <li>Debugging the code</li>
                <li>Implement new functionalities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Job Details:
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Job Type:</strong> Full-time
              </p>
              <p className="text-sm text-gray-600">
                <strong>Working Days:</strong> Monday-Friday
              </p>
              <p className="text-sm text-gray-600">
                <strong>No. of Openings:</strong> 5
              </p>
              <p className="text-sm text-gray-600">
                <strong>Posted Date:</strong> 7-01-2025
              </p>
            </div>
          </div>

          {/* Job Requirements */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Job Requirements:
            </h2>
            <div className="space-y-4">
              {/* Qualifications */}
              <div>
                <Label className="font-bold text-gray-700">
                  Qualifications:
                </Label>{" "}
                <span className="text-sm text-gray-600">
                  Bachelor's in Computer Science or related field
                </span>
              </div>

              {/* Experience */}
              <div>
                <Label className="font-bold text-gray-700">Experience:</Label>{" "}
                <span className="text-sm text-gray-600">
                  2-4 years of experience in web development
                </span>
              </div>

              {/* Skills */}
              <div>
                <Label className="font-bold text-gray-700">Skills:</Label>{" "}
                <span className="text-sm text-gray-600">
                  JavaScript, React, Node.js, MongoDB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDescription;
