import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/ApiEndPoint";
import axios from "axios";

const RecruiterHome = () => {
  const { company } = useSelector((state) => state.company);
  const { user } = useSelector((state) => state.auth);
  const { recruiters } = useSelector((state) => state.recruiters);
  const [loading, setLoading] = useState(false);
  const [jobsStatistics, setJobsStatistics] = useState(null);

  const fetchJobsStatistics = async (companyId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${JOB_API_END_POINT}/job-statistics/${company?._id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setJobsStatistics(response.data.statistics);
      }
    } catch (err) {
      console.error("Failed to fetch job statistics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && company && !jobsStatistics) {
      fetchJobsStatistics();
    }
  }, [user]);

  const cards = [
    {
      title: "Recruiters",
      count: recruiters.length,
      gradient: "from-blue-500 to-indigo-500",
      description: "Manage and oversee your team of recruiters effectively.",
    },
    {
      title: "Posted Jobs",
      count: jobsStatistics?.totalJobs,
      gradient: "from-green-500 to-teal-500",
      description: "Track the jobs you have posted and their status.",
    },
    {
      title: "Max Post Jobs",
      count: company?.maxPostJobs,
      gradient: "from-gray-500 to-gray-700",
      description: "View the maximum number of jobs you can post.",
    },
    {
      title: "Active Jobs",
      count: jobsStatistics?.activeJobs,
      gradient: "from-purple-500 to-pink-500",
      description: "Monitor jobs that are currently active and open.",
    },
    {
      title: "Expired Jobs",
      count: jobsStatistics?.inactiveJobs,
      gradient: "from-orange-500 to-yellow-500",
      description: "Review jobs that have expired and are no longer active.",
    },
    {
      title: "Applicants",
      count: jobsStatistics?.totalApplicants,
      gradient: "from-red-500 to-pink-500",
      description: "Analyze the total number of applicants for your jobs.",
    },
    {
      title: "Selected Candidates",
      count: jobsStatistics?.selectedCandidates,
      gradient: "from-teal-500 to-blue-500",
      description: "Keep track of candidates who have been selected.",
    },
  ];

  return (
    <>
      {company && user?.isVerify ? (
        <div className="min-h-screen bg-gray-100 p-8">
          {/* Header Section */}
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome, {company?.companyName || "Recruiter"}
            </h1>
            <p className="text-gray-600 mt-2">
              Empower your hiring process with key insights and metrics at a
              glance.
            </p>
          </header>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <div
                  className={`h-48 bg-gradient-to-r ${card.gradient} flex flex-col items-center justify-center`}
                >
                  <h2 className="text-white text-xl font-semibold text-center">
                    {card.title}
                  </h2>
                  <h2 className="text-white text-4xl font-bold mt-2">
                    {card.count}
                  </h2>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm text-center">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !company ? (
        <p className="h-screen flex items-center justify-center">
          <span className="text-4xl text-gray-400">Company not created</span>
        </p>
      ) : (
        <p className="h-screen flex items-center justify-center">
          <span className="text-4xl text-gray-400">
            You are not verified by your company
          </span>
        </p>
      )}
    </>
  );
};

export default RecruiterHome;
