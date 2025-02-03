import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/ApiEndPoint";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const JobDescription = () => {
  const { id } = useParams(); // Get Job ID from URL
  const navigate = useNavigate();
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
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-xl animate-pulse">
          Loading job details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-blue-600 hover:underline text-2xl p-2"
          >
            ←
          </button>

          {/* Job Title and Overview */}
          <div className="border-b pb-4 mb-6 flex justify-between items-center">
            {/* Left Section */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {jobDetails?.title || "Job Title Not Available"}
              </h1>
              <h5 className="text-sm text-gray-500 mt-1">
                {jobDetails?.companyName || "Company Not Specified"}
              </h5>
              <h6 className="text-sm text-gray-500">
                {jobDetails?.location || "Location Not Available"}
              </h6>
              <h6 className="text-sm text-gray-700 font-medium mt-1">
                ₹{jobDetails?.salary || "Salary Not Specified"}
              </h6>
            </div>

            {/* Right Section - Apply Now Button */}
            <button
              onClick={() => navigate(`/apply/${id}`)}
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
              {jobDetails?.details || "No description provided."}
            </p>
          </div>

          {/* Benefits, Responsibilities, and Additional Details */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Benefits:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {jobDetails?.benefits?.length > 0 ? (
                  jobDetails.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))
                ) : (
                  <li>Not specified</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Responsibilities:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {jobDetails?.responsibilities?.length > 0 ? (
                  jobDetails.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))
                ) : (
                  <li>Not specified</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Job Details:
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Job Type:</strong>{" "}
                {jobDetails?.jobType || "Not specified"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Working Days:</strong>{" "}
                {jobDetails?.duration || "Not specified"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>No. of Openings:</strong>{" "}
                {jobDetails?.numberOfOpening || "Not specified"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Posted Date:</strong>{" "}
                {jobDetails?.postedDate || "Not specified"}
              </p>
            </div>
          </div>

          {/* Job Requirements */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Job Requirements:
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700">Qualifications:</h4>
                <p className="text-sm text-gray-600">
                  {jobDetails?.qualifications?.join(", ") || "Not specified"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Experience:</h4>
                <p className="text-sm text-gray-600">
                  {jobDetails?.experience || "Not specified"} years
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Skills:</h4>
                <p className="text-sm text-gray-600">
                  {jobDetails?.skills?.join(", ") || "Not specified"}
                </p>
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
