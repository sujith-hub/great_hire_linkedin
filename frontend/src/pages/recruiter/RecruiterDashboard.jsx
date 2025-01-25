import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"; // Use Outlet for nested routing
import Navbar from "@/components/shared/Navbar";
import { COMPANY_API_END_POINT } from "@/utils/ApiEndPoint";
import axios from "axios";
import { addCompany } from "@/redux/companySlice";
import DashboardNavigations from "./DashboardNavigations";
import { fetchRecruiters } from "@/redux/recruiterSlice";
import { fetchCurrentPlan } from "@/redux/jobPlanSlice";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);
  const { recruiters } = useSelector((state) => state.recruiters);
  const { jobPlan } = useSelector((state) => state.jobPlan);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user?.isVerify && user?.isCompanyCreated && recruiters?.length === 0) {
      dispatch(fetchRecruiters(company?._id));
    }
    if (!jobPlan) {
      dispatch(fetchCurrentPlan(company?._id));
    }
  }, [company?._id]);

  useEffect(() => {
    const fetchCompanyByUserId = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${COMPANY_API_END_POINT}/company-by-userid`,
          { userId: user?._id },
          { withCredentials: true }
        );
        if (response?.data.success) {
          dispatch(addCompany(response?.data.company));
        }
      } catch (err) {
        console.error(`Error fetching company by user: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    if (!company) {
      fetchCompanyByUserId();
    }
  }, [user, dispatch]);

  useEffect(() => {}, [user]);

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex">
        <DashboardNavigations />
        <div className="ml-52 w-full bg-gradient-to-r from-gray-100 via-blue-100 to-gray-100 h-full">
          {" "}
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
