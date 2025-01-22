// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // For accessing dynamic route params
// import axios from "axios"; // For API requests
// import { Label } from "@/components/ui/label";
// import { JOB_API_END_POINT } from "@/utils/ApiEndPoint";

// const JobDetail = () => {
//   const { id } = useParams(); // Get job ID from URL
//   const [jobDetails, setJobDetails] = useState(null); // State to store job details
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   console.log("Job ID:", id);

//   // Fetch job details from the API
//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
//           withCredentials: true,
//         });

//         console.log("API Response:", response.data);

//         if (!response.data.success) {
//           // If success is false, handle the error
//           setError(response.data.message || "Job details not found.");
//           setJobDetails(null); // Clear job details in case of failure
//           return;
//         }

//         // Access jobDetails from the nested 'job' object in the response
//         setJobDetails(response.data.job.jobDetails);
//       } catch (err) {
//         console.error("Error fetching job details:", err.message);
//         setError(err.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchJobDetails();
//     }
//   }, [id]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="max-w-5xl mx-auto my-10 text-gray-500">
//         Loading job details...
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return <div className="max-w-5xl mx-auto my-10 text-red-500">{error}</div>;
//   }

//   // Render job details
//   return (
//     <div className="max-w-5xl mx-auto my-10">
//       {/* Job Title and Basic Info */}
//       <div>
//         <h1 className="font-bold text-xl">{jobDetails?.title}</h1>
//         <h5 className="text-sm">{jobDetails?.companyName}</h5>
//         <h6 className="text-sm">{jobDetails?.location || "Location not specified"}</h6>
//         <h6 className="text-sm">{jobDetails?.salary || "Salary not specified"}</h6>
//       </div>

//       {/* Job Description */}
//       <div className="my-6">
//         <h1 className="border-b-2 border-b-gray-300 font-medium py-2">
//           Job Description:
//         </h1>
//         <p className="text-sm text-gray-600">{jobDetails?.details || "No description provided."}</p>
//         <br />

//         <div>
//           <Label className="font-bold text-gray-700">Benefits:</Label>{" "}
//           <span className="text-sm text-gray-600">
//             {jobDetails?.benefits?.join(", ") || "Not specified"}
//           </span>
//         </div>

//         <div>
//           <Label className="font-bold text-gray-700">Responsibilities:</Label>{" "}
//           <span className="text-sm text-gray-600">
//             {jobDetails?.responsibilities?.join(", ") || "Not specified"}
//           </span>
//         </div>

//         <div>
//           <Label className="font-bold text-gray-700">Job Type:</Label>{" "}
//           <span className="text-sm text-gray-600">{jobDetails?.jobType || "Not specified"}</span>
//         </div>
//         <div>
//           <Label className="font-bold text-gray-700">Working Days:</Label>{" "}
//           <span className="text-sm text-gray-600">{jobDetails?.duration || "Not specified"}</span>
//         </div>

//         <div>
//           <Label className="font-bold text-gray-700">No. of Openings:</Label>{" "}
//           <span className="text-sm text-gray-600">
//             {jobDetails?.numberOfOpening || "Not specified"}
//           </span>
//         </div>
//       </div>

//       {/* Job Requirements */}
//       <div className="my-6">
//         <h1 className="border-b-2 border-b-gray-300 font-medium py-2">
//           Job Requirements:
//         </h1>
//         <div className="space-y-4">
//           {/* Qualifications */}
//           <div>
//             <Label className="font-bold text-gray-700">Qualifications:</Label>{" "}
//             <span className="text-sm text-gray-600">
//               {jobDetails?.qualifications?.join(", ") || "Not specified"}
//             </span>
//           </div>

//           {/* Experience */}
//           <div>
//             <Label className="font-bold text-gray-700">Experience:</Label>{" "}
//             <span className="text-sm text-gray-600">
//               {jobDetails?.experience || "Not specified"} years
//             </span>
//           </div>

//           {/* Skills */}
//           <div>
//             <Label className="font-bold text-gray-700">Skills:</Label>{" "}
//             <span className="text-sm text-gray-600">
//               {jobDetails?.skills?.join(", ") || "Not specified"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { JOB_API_END_POINT } from "@/utils/ApiEndPoint";

const JobDetail = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (!response.data.success) {
          setError(response.data.message || "Job details not found.");
          setJobDetails(null);
          return;
        }

        setJobDetails(response.data.job.jobDetails);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto my-10 text-gray-500">
        Loading job details...
      </div>
    );
  }

  if (error) {
    return <div className="max-w-5xl mx-auto my-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      {/* Job Title and Basic Info */}
      <div>
        <h1 className="font-bold text-xl">{jobDetails?.title}</h1>
        <h5 className="text-sm">{jobDetails?.companyName}</h5>
        <h6 className="text-sm">{jobDetails?.location || "Location not specified"}</h6>
        <h6 className="text-sm">{jobDetails?.salary || "Salary not specified"}</h6>
      </div>

      {/* Job Description */}
      <div className="my-4">
        <h1 className="border-b-2 border-b-gray-300 font-medium py-1">
          Job Description:
        </h1>
        <p className="text-sm text-gray-600">{jobDetails?.details || "No description provided."}</p>
        <br />

        {/* Benefits and Responsibilities in Two Columns */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <Label className="font-bold text-gray-700">Benefits:</Label>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {jobDetails?.benefits?.length > 0
                ? jobDetails.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))
                : <li>Not specified</li>}
            </ul>
          </div>
          <div className="w-full lg:w-1/2">
            <Label className="font-bold text-gray-700">Responsibilities:</Label>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {jobDetails?.responsibilities?.length > 0
                ? jobDetails.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))
                : <li>Not specified</li>}
            </ul>
          </div>
        </div>

        <div>
          <h1 className="border-b-2 border-b-gray-300 font-medium py-1">
            Job Details:
          </h1>
          <Label className="font-bold text-gray-700">Job Type:</Label>{" "}
          <span className="text-sm text-gray-600">{jobDetails?.jobType || "Not specified"}</span>
        </div>
        <div>
          <Label className="font-bold text-gray-700">Working Days:</Label>{" "}
          <span className="text-sm text-gray-600">{jobDetails?.duration || "Not specified"}</span>
        </div>
        <div>
          <Label className="font-bold text-gray-700">No. of Openings:</Label>{" "}
          <span className="text-sm text-gray-600">
            {jobDetails?.numberOfOpening || "Not specified"}
          </span>
        </div>
      </div>

      {/* Job Requirements */}
      <div className="my-4">
        <h1 className="border-b-2 border-b-gray-300 font-medium py-1">
          Job Requirements:
        </h1>
        <div className="space-y-2">
          {/* Qualifications */}
          <div>
            <Label className="font-bold text-gray-700">Qualifications:</Label>{" "}
            <span className="text-sm text-gray-600">
              {jobDetails?.qualifications?.join(", ") || "Not specified"}
            </span>
          </div>

          {/* Experience */}
          <div>
            <Label className="font-bold text-gray-700">Experience:</Label>{" "}
            <span className="text-sm text-gray-600">
              {jobDetails?.experience || "Not specified"} years
            </span>
          </div>

          {/* Skills */}
          <div>
            <Label className="font-bold text-gray-700">Skills:</Label>{" "}
            <span className="text-sm text-gray-600">
              {jobDetails?.skills?.join(", ") || "Not specified"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;



