import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"; // Use Outlet for nested routing
import Navbar from "@/components/shared/Navbar";
import { COMPANY_API_END_POINT } from "@/utils/ApiEndPoint";
import axios from "axios";
import { addCompany } from "@/redux/companySlice";
import DashboardNavigations from "./DashboardNavigations";
import { fetchRecruiters } from "@/redux/RecruiterSlice";

const RecruiterDashboard = () => {
  const { user } = useSelector((state) => state.auth); // Get the authenticated user
  const { company } = useSelector((state) => state.company); // Get the associated company
  const { recruiters } = useSelector((state) => state.recruiters); // Get the recruiters list
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Loading state for fetching company data

  // Fetch Recruiters if conditions are met
  useEffect(() => {
    if (user?.isVerify && user?.isCompanyCreated && recruiters?.length === 0)
      dispatch(fetchRecruiters(company?._id));
  }, [company?._id]);
    if (
      user?.isVerify && // Ensure the user is verified
      user?.isCompanyCreated && // Ensure the company is created
      company?._id && // Ensure company ID exists
      recruiters?.length === 0 // Avoid duplicate fetch calls
    ) {
      dispatch(fetchRecruiters(company._id));
    }
  }, [
    company?._id,
    recruiters?.length,
    user?.isVerify,
    user?.isCompanyCreated,
    dispatch,
  ]);

  // Fetch Company by User ID
  useEffect(() => {
    const fetchCompanyByUserId = async () => {
      try {
        setLoading(true); // Set loading to true during API call
        const response = await axios.post(
          `${COMPANY_API_END_POINT}/company-by-userid`,
          { userId: user?._id }, // Pass user ID in the request body
          { withCredentials: true }
        );
        if (response?.data.success) {
          dispatch(addCompany(response?.data.company));
        if (response.data.success) {
          dispatch(addCompany(response.data.company)); // Update Redux store with company data
        }
      } catch (err) {
        console.error(`Error fetching company by user: ${err}`);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    if (user?.isVerify) {
      fetchCompanyByUserId(); // Call the API if user is verified
    }
  }, [user?.isVerify, user?._id, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex">
        <DashboardNavigations />
        <div className="ml-52 w-full p-4">
          {/* Adjust margin for sidebar */}
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <Outlet /> // Render nested routes
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
