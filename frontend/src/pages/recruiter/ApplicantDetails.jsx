import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { MdOutlineVerified } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  VERIFICATION_API_END_POINT,
} from "@/utils/ApiEndPoint";

const ApplicantDetails = ({
  applicant,
  setApplicantDetailsModal,
  applicantId,
  jobId,
  applicantStatus,
  setApplicantStatus,
}) => {
  const [loading, setLoading] = useState(0);

  const updateStatus = async (status) => {
    try {
      setLoading(status);
      if (status === 1) status = "Shortlisted";
      else status = "Rejected";
      const response = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicantId}/update`,
        { status },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        const emailResponse = await axios.post(
          `${VERIFICATION_API_END_POINT}/send-email-applicants/${jobId}`,
          {
            email: applicant?.emailId.email,
            status,
          },
          { withCredentials: true }
        );
        if (emailResponse.data.success) {
          setApplicantStatus(status);
          toast.success("Status Updated");
        }
      } else {
        toast.error("Status updation failed");
      }
    } catch (err) {
      toast.error("An error occurred while updating the status");
      console.error("Error updating status:", err);
    } finally {
      setLoading(0);
      setApplicantDetailsModal(false);
    }
  };
  return (
    <div className=" flex items-center justify-center">
      <div className="w-11/12 max-w-4xl bg-white shadow-lg rounded-2xl p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <IoArrowBackSharp
            onClick={() => setApplicantDetailsModal(false)}
            className="cursor-pointer"
            size={25}
          />
          <h1 className="text-2xl font-bold text-gray-800">
            Applicant Details
          </h1>
        </div>

        <div className="space-y-6">
          {/* Personal Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Personal Details
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <p className="text-gray-600">
                <span className="font-semibold">Full Name:</span>{" "}
                {applicant.fullname}
              </p>
              <p className="text-gray-600 flex space-x-2 items-center">
                <span className="font-semibold">Email:</span>
                <span>{applicant.emailId.email}</span>
                {applicant.emailId.isVerified && (
                  <MdOutlineVerified size={25} color="green" title="Verified" />
                )}
              </p>
              <p className="text-gray-600 items-center">
                <span className="font-semibold">Phone Number:</span>{" "}
                <span>{applicant.phoneNumber.number}</span>
                {applicant.phoneNumber.isVerified && <MdOutlineVerified />}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Address:</span>{" "}
                {applicant.address.city}, {applicant.address.state},{" "}
                {applicant.address.country}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-gray-700">Skills</h2>
            <div className="flex space-x-3 flex-wrap">
              {applicant?.profile?.skills?.length > 0 ? (
                applicant.profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg font-bold text-sm "
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-600">No skills listed</span>
              )}
            </div>
          </div>
          {/* Profile Details */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">Profile</h2>
            <p className="text-gray-600 mt-2 flex flex-col space-y-2">
              <span className="font-semibold">Bio</span>
              <p>{applicant.profile.bio}</p>
              <span className="font-semibold">Cover Letter</span>
              <p>{applicant.profile.coverLetter}</p>
            </p>
          </div>

          {/* Experience Details */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">Experience</h2>
            <p className="text-gray-600 mt-2 flex  space-x-2">
              <span className="font-semibold">Company Name</span>
              <span>{applicant.profile.experience.companyName}</span>
            </p>
            <p className="text-gray-600 flex  space-x-2">
              <span className="font-semibold">Job Profile:</span>{" "}
              <span>{applicant.profile.experience.jobProfile}</span>
            </p>
            <p className="text-gray-600 flex flex-col space-y-2">
              <span className="font-semibold">Details:</span>{" "}
              {applicant.profile.experience.experienceDetails}
            </p>
          </div>

          {/* Resume */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Resume</h2>
            <a
              href={applicant.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {applicant.profile.resumeOriginalName}
            </a>
          </div>
        </div>

        {/* Buttons */}
        {applicantStatus === "Pending" ? (
          <div className="mt-6 flex justify-end gap-4">
            <button
              className={`px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 ${
                (loading === 1 || loading === -1) && "cursor-not-allowed"
              }`}
              disabled={loading === 1 || loading === -1}
              onClick={() => updateStatus(1)}
            >
              {loading === 1 ? "Updaing..." : "Shortlist"}
            </button>
            <button
              className={`px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 ${
                (loading === 1 || loading === -1) && "cursor-not-allowed"
              }`}
              disabled={loading === 1 || loading === -1}
              onClick={() => updateStatus(-1)}
            >
              {loading === -1 ? "Updating..." : "Reject"}
            </button>
          </div>
        ) : applicantStatus === "Shortlisted" ? (
          <p className="text-green-600 flex justify-end ">
            <span>Shortlisted</span>
          </p>
        ) : (
          <p className="text-red-600 flex justify-end">Rejected</p>
        )}
      </div>
    </div>
  );
};

export default ApplicantDetails;
