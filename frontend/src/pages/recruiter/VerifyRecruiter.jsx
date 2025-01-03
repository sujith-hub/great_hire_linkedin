import React, { useEffect, useState } from "react";
import PageNotFound from "../PageNotFound";
import Loading from "@/components/Loading";
import axios from "axios"; // Ensure axios is imported
import { useParams } from "react-router-dom";
import {
  VERIFICATION_API_END_POINT,
  COMPANY_API_END_POINT,
  RECRUITER_API_END_POINT,
} from "@/utils/ApiEndPoint";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  setRecruiterVerification,
  setRecruiterIsCompanyCreated,
} from "@/redux/authSlice";

const VerifyRecruiter = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(0);
  const [status, setStatus] = useState("loading");
  const { token } = useParams();
  const [decoded, setDecoded] = useState(null);
  const [recruiterData, setRecruiterData] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${VERIFICATION_API_END_POINT}/verify-token`,
          { token }
        );
        if (response.data.success) {
          setDecoded(response.data.decoded);
          setStatus("valid token");
        }
      } catch (err) {
        console.log(`Error in token verification: ${err}`);
        setStatus("page not found");
      }
    };

    if (token) verifyToken();
  }, [token]);

  useEffect(() => {
    if (decoded) {
      const fetchDetails = async () => {
        try {
          const recruiterResponse = await axios.post(
            `${RECRUITER_API_END_POINT}/recruiter-by-id`,
            { recruiterId: decoded.recruiterId }
          );
          setRecruiterData(recruiterResponse.data.recruiter);

          const companyResponse = await axios.post(
            `${COMPANY_API_END_POINT}/company-by-id`,
            { companyId: decoded.companyId }
          );
          setCompanyData(companyResponse.data.company);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDetails();
    }
  }, [decoded]);

  const isVerifyRecruiter = async (status) => {
    try {
      // Set loading to true before making the request
      setLoading(status);

      // Make the API call
      const response = await axios.post(
        `${VERIFICATION_API_END_POINT}/send-verification-status`,
        {
          companyData,
          recruiterData,
          status,
        }
      );

      // Check if the response is successful
      if (response.data.success) {
        toast.success("Response sent to Great Hire!");
        dispatch(setRecruiterVerification(status));
        if (status === -1) dispatch(setRecruiterIsCompanyCreated(false));
      } else {
        // Handle unexpected success=false case
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(`Error in recruiter confirmation: ${err.message}`);
      toast.error("Failed to send response. Please try again.");
    } finally {
      // Always stop the loading spinner after the request
      setLoading(0);
    }
  };

  return (
    <>
      {status === "loading" && <Loading color="blue-600" />}
      {status === "page not found" && <PageNotFound />}
      {status === "valid token" && (
        <div className="min-h-screen  bg-gray-100 flex flex-col justify-center gap-2 items-center ">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Verify Recruiter and Company Details
          </h1>

          <div className="flex flex-col md:flex-row w-full gap-2 p-4">
            {/* Company Details */}
            {companyData && (
              <div className="flex flex-col space-y-3 w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Company Details
                </h2>

                <div className="w-full h-40">
                  <img
                    src={companyData.businessFile}
                    alt="Business File"
                    className="w-full h-full object-full"
                  />
                </div>
                <p>
                  <span className="font-medium text-gray-600">Name:</span>{" "}
                  {companyData.companyName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Website:</span>{" "}
                  <a
                    href={companyData.companyWebsite}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {companyData.companyWebsite || "N/A"}
                  </a>
                </p>
                <p>
                  <span className="font-medium text-gray-600">Industry:</span>{" "}
                  {companyData.industry || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Address:</span>{" "}
                  {`${companyData.address.streetAddress}, ${companyData.address.city}, ${companyData.address.state}, ${companyData.address.country}`}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {companyData.email}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Phone:</span>{" "}
                  {companyData.phone || "N/A"}
                </p>
              </div>
            )}

            {/* Recruiter Details */}
            {recruiterData && (
              <div className="flex flex-col space-y-4 w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Recruiter Details
                </h2>
                <div className="w-full justify-center flex items-center h-40 ">
                  <img
                    src={
                      recruiterData?.profile.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="user photo"
                    className="h-full object-cover"
                  />
                </div>

                <p>
                  <span className="font-medium text-gray-600">Name:</span>{" "}
                  {recruiterData?.fullname}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Position:</span>{" "}
                  {recruiterData?.position || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {recruiterData?.email}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Phone:</span>{" "}
                  {recruiterData?.phoneNumber || "N/A"}
                </p>
              </div>
            )}
          </div>

          {/* Verification Buttons */}
          {user.isVerify === 0 ? (
            <>
              <div className="flex justify-center space-x-4">
                <button
                  className={`px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 ${
                    loading === -1 ? "cursor-not-allowed" : ""
                  }`}
                  onClick={() => isVerifyRecruiter(-1)}
                >
                  {loading === -1 ? "Not Verifing..." : "Not Verified"}
                </button>
                <button
                  className={`px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ${
                    loading === 1 ? "cursor-not-allowed" : ""
                  }`}
                  onClick={() => isVerifyRecruiter(1)}
                >
                  {loading === 1 ? "Verifing..." : "Verified"}
                </button>
              </div>
            </>
          ) : (
            <p className="font-bold text-lg text-red-600">
              Your Feedback Submitted!
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default VerifyRecruiter;
