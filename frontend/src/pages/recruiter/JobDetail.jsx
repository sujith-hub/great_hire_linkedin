import React from "react";
import { Label } from "@/components/ui/label";

const JobDetail = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto my-10">
        {/* Job Title and Details */}
        <div>
          <h1 className="font-bold text-xl">Fullstack Developer</h1>
          <h5 className="text-sm">Company Name</h5>
          <h6 className="text-sm">Address</h6>
          <h6 className="text-sm">3LPA - 5LPA</h6>
        </div>

        {/* Job Description */}
        <div className="my-6">
          <h1 className="border-b-2 border-b-gray-300 font-medium py-2">
            Job Description:
          </h1>
          <p className="text-sm text-gray-600">This is a job description.We are seeking a highly skilled and motivated Backend Developer
             to join our dynamic team. The ideal candidate will be responsible for creating and maintaining server-side 
             application logic, ensuring high performance and responsiveness to requests from the front end.
              You will work closely with the front-end developers, architects, and stakeholders to build scalable and
               robust applications.</p> <br />

               <div>
              <Label className="font-bold text-gray-700">Benefits:</Label>{" "}
              <span className="text-sm text-gray-600">Flexible working hours,Opportunity to work with a highly collaborative
                 team, Learning and development budget, Health and wellness benefits.</span>
            </div>

            <div>
              <Label className="font-bold text-gray-700">Responsibilities:</Label>{" "}
              <span className="text-sm text-gray-600">Develop and maintain website, Debugging the code, Implement the new 
                functionalities
              </span>
            </div>

          <div>
              <Label className="font-bold text-gray-700">Job Type:</Label>{" "}
              <span className="text-sm text-gray-600">Full-time</span>
            </div>
            <div>
              <Label className="font-bold text-gray-700">Working days:</Label>{" "}
              <span className="text-sm text-gray-600">Monday-Friday</span>
            </div>


            <div>
              <Label className="font-bold text-gray-700">No. of Openings :</Label>{" "}
              <span className="text-sm text-gray-600">5</span>
            </div>

            <div>
              <Label className="font-bold text-gray-700">Posted Date:</Label>{" "}
              <span className="text-sm text-gray-600">7-01-2025</span>
            </div>
        </div>

        {/* Job Requirements */}
        <div className="my-6">
          <h1 className="border-b-2 border-b-gray-300 font-medium py-2">
            Job Requirements:
          </h1>
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
  );
};

export default JobDetail;
