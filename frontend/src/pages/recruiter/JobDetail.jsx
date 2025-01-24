import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/ApiEndPoint";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);
  const [jobDetails, setJobDetails] = useState(null);
  const [dloading, dsetLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [jobOwner, setJobOwner] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (!response.data.success) {
          setError(response.data.message || "Job details not found.");
          setJobDetails(null);
          return;
        }
        setJobOwner(response?.data.job.created_by);
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

  const deleteJob = async (jobId) => {
    try {
      dsetLoading(true);
      const response = await axios.delete(
        `
        ${JOB_API_END_POINT}/delete/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error(
        "There was an error deleting the job. Please try again later."
      );
    } finally {
      dsetLoading(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
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
    <div className="flex flex-col space-y-4 p-6 md:p-10 min-h-screen">
      {/* Job Header Section */}
      <div className="bg-blue-700 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">{jobDetails?.title}</h1>
        <p className="text-lg">
          {jobDetails?.companyName || "Company not specified"}
        </p>
        <p className="text-md mt-1">
          {jobDetails?.location || "Location not specified"}
        </p>
        <p className="text-lg mt-1 font-semibold">
          {jobDetails?.salary
            ?.replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, "$1,")
            .split("-")
            .map((part, index) => (
              <span key={index}>
                ₹{part.trim()}
                {index === 0 ? " - " : ""}
              </span>
            ))}{" "}
          <span className="text-sm">Monthly</span>
        </p>
      </div>

      {/* Job Description */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Job Description
        </h2>
        <p className="text-gray-600 text-lg">
          {jobDetails?.details || "No description provided."}
        </p>
      </div>

      {/* Benefits and Responsibilities */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Benefits</h3>
          <ul className="list-disc list-inside text-gray-600">
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
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Responsibilities
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            {jobDetails?.responsibilities?.length > 0 ? (
              jobDetails.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>
      </div>

      {/* Additional Details */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Additional Details
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-gray-700">Job Type</h4>
            <p className="text-gray-600">
              {jobDetails?.jobType || "Not specified"}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Working Days</h4>
            <p className="text-gray-600">
              {jobDetails?.duration || "Not specified"}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">No. of Openings</h4>
            <p className="text-gray-600">
              {jobDetails?.numberOfOpening || "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Job Requirements */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Job Requirements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700">Qualifications</h4>
            <p className="text-gray-600">
              {jobDetails?.qualifications?.join(", ") || "Not specified"}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Experience</h4>
            <p className="text-gray-600">
              {jobDetails?.experience || "Not specified"} years
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Skills</h4>
            <p className="text-gray-600">
              {jobDetails?.skills?.join(", ") || "Not specified"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end space-x-2">
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() =>
            navigate(`/recruiter/dashboard/applicants-details/${id}`)
          }
        >
          Applicants Details
        </Button>
        {(user?._id === jobOwner ||
          user?.emailId.email === company?.adminEmail) && (
          <Button
            className={`bg-red-600 hover:bg-red-700 ${
              dloading ? "cursor-not-allowed" : ""
            }`}
            onClick={() => deleteJob(id)}
            disabled={dloading}
          >
            {dloading ? "Deleting..." : "Delete"}
          </Button>
        )}
        
      </div>
    </div>
  );
};

export default JobDetail;
