import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"; // Use Outlet for nested routing
import Navbar from "@/components/shared/Navbar";
import { COMPANY_API_END_POINT } from "@/utils/ApiEndPoint";
import axios from "axios";
import { addCompany } from "@/redux/companySlice";
import DashboardNavigations from "./DashboardNavigations";

const RecruiterDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyByUserId = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${COMPANY_API_END_POINT}/company-by-userid`,
          { userId: user?._id },
          { withCredentials: true }
        );
        if (response.data.success) {
          dispatch(addCompany(response.data.company));
        }
      } catch (err) {
        console.error(`Error fetching company by user: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    if (user?.isVerify === 1) {
      fetchCompanyByUserId();
    }
  }, [user, dispatch]);

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex">
        <DashboardNavigations />
        <div className="ml-52 w-full p-4 "> {/* Adjust margin for sidebar */}
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
