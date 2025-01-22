import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiSearch } from "react-icons/fi";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useSelector } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/ApiEndPoint";
import axios from "axios";
import { toast } from "react-hot-toast";

const statusOptions = ["All", "Active", "Expired"];

const PostedJobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState({});

  const handlePostJob = () => {
    navigate("/recruiter/dashboard/post-job");
  };

  const handleJobDetailsClick = (jobId) => {
    navigate(`/recruiter/dashboard/job-details/${jobId}`);
  };

  const handleApplicantsClick = (jobId) => {
    navigate(`/recruiter/dashboard/applicants-details/${jobId}`);
  };

  const fetchAllJobs = async (companyId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${JOB_API_END_POINT}/jobs-list/${companyId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setJobs(response.data.jobs);
      } else {
        console.error("Error: Unable to fetch jobs.");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job?.jobDetails?.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && job.jobDetails.isActive) ||
      (statusFilter === "Expired" && !job.jobDetails.isActive);
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    if (user && company) {
      fetchAllJobs(company?._id);
    }
  }, [user]);

  const toggleActive = async (event, jobId, isActive) => {
    event.stopPropagation();
    try {
      setStatusLoading((prevLoading) => ({ ...prevLoading, [jobId]: true }));
      const response = await axios.put(
        `${JOB_API_END_POINT}/toggle-active`,
        {
          jobId,
          isActive,
          companyId: company?._id,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId
              ? { ...job, jobDetails: { ...job.jobDetails, isActive } }
              : job
          )
        );

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error toggling job status:", error);
      toast.error(
        "There was an error toggling the job status. Please try again later."
      );
    } finally {
      setStatusLoading((prevLoading) => ({ ...prevLoading, [jobId]: false }));
    }
  };

  return (
    <>
      {company && user.isVerify ? (
        <div className="p-5 bg-gray-50 shadow-md rounded-lg">
          <div className="mb-6">
            <div className="p-10 bg-white shadow-md rounded-lg flex justify-center items-center">
              <button
                onClick={handlePostJob}
                className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-600 transition flex items-center"
              >
                <span className="text-2xl font-bold mr-1">+</span> Post New Job
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center">
              <p className="text-blue-600 font-bold">Loading jobs...</p>
            </div>
          ) : (
            <>
              <Table className="w-full border-collapse border border-gray-200">
                <TableCaption className="underline mb-6 text-gray-800 text-lg font-bold text-center caption-top">
                  Posted Job List
                </TableCaption>
              </Table>
              <div className="flex flex-wrap justify-between mb-2 gap-4">
                <div className="relative w-full md:w-1/3">
                  <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by job title"
                    className="pl-10 p-2 border border-gray-300 rounded-md w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <select
                  className="p-2 border border-gray-300 rounded-md w-full md:w-1/6"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <Table className="w-full border-collapse border border-gray-200">
                <TableHeader className="bg-gray-300 ">
                  <TableRow>
                    <TableHead className="text-center">Sr No.</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Job Role</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="text-center">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                      <TableRow
                        key={job._id}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {new Date(job.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>{job.jobDetails.title}</TableCell>

                        {job?.created_by === user?._id ||
                        user?.emailId.email === company?.adminEmail ? (
                          <>
                            <TableCell className="py-3 px-6 flex justify-center">
                              {statusLoading[job._id] ? (
                                "loading..."
                              ) : job.jobDetails.isActive ? (
                                <FaToggleOn
                                  className="text-green-500 cursor-pointer"
                                  onClick={(event) =>
                                    toggleActive(
                                      event,
                                      job._id,
                                      !job.jobDetails.isActive
                                    )
                                  }
                                  size={30}
                                />
                              ) : (
                                <FaToggleOff
                                  className="text-red-500 cursor-pointer"
                                  onClick={(event) =>
                                    toggleActive(
                                      event,
                                      job._id,
                                      !job.jobDetails.isActive
                                    )
                                  }
                                  size={30}
                                />
                              )}
                            </TableCell>
                          </>
                        ) : (
                          <TableCell >-----</TableCell>
                        )}

                        <TableCell className="space-x-2">
                          <button
                            onClick={() => handleJobDetailsClick(job._id)}
                            className="bg-blue-700 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
                          >
                            Job Details
                          </button>
                          <button
                            onClick={() => handleApplicantsClick(job._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition"
                          >
                            Applicants Details
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan="6"
                        className="text-center text-gray-500 py-4"
                      >
                        No jobs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
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

export default PostedJobList;
