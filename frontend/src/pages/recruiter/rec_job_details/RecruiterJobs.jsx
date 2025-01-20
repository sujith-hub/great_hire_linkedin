import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { JOB_API_END_POINT } from "@/utils/ApiEndPoint";
import { useNavigate } from "react-router-dom";

const RecruiterJob = ({ recruiterId }) => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});
  const [dloading, dsetLoading] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!user || user?.role !== "recruiter") navigate("/login");
  }, [user]);

  const getJobsByRecruiter = async (recruiterId) => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, [recruiterId]: true }));
      const response = await axios.get(
        `${JOB_API_END_POINT}/jobs/${recruiterId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setJobs(response.data.jobs);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error(
        "There was an error fetching the jobs. Please try again later."
      );
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [recruiterId]: false }));
    }
  };

  useEffect(() => {
    if (recruiterId && jobs.length === 0) {
      getJobsByRecruiter(recruiterId);
    }
  }, [recruiterId]);

  const toggleActive = async (event, jobId, isActive) => {
    event.stopPropagation();
    try {
      setLoading((prevLoading) => ({ ...prevLoading, [jobId]: true }));
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
      setLoading((prevLoading) => ({ ...prevLoading, [jobId]: false }));
    }
  };

  const deleteJob = async (event, jobId) => {
    event.stopPropagation();
    try {
      dsetLoading((prevLoading) => ({ ...prevLoading, [jobId]: true }));
      const response = await axios.delete(
        `${JOB_API_END_POINT}/delete/${jobId}`,
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
      dsetLoading((prevLoading) => ({ ...prevLoading, [jobId]: false }));
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.jobDetails.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobDetails.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.jobDetails.jobType.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "active" && job.jobDetails.isActive) ||
      (filterStatus === "inactive" && !job.jobDetails.isActive);

    return searchMatch && statusMatch;
  });

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">Jobs Created By You</h2>
      <div className="mb-4 flex justify-between px-2">
        <input
          type="text"
          placeholder="Search by title, company or job type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-72 border border-gray-400 rounded-sm"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Job Title
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Company
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Location
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Job Type
            </th>
            {recruiterId === user?._id && (
              <>
                <th className="py-3 px-6 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 bg-gray-200 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr
                key={job._id}
                className="border-b cursor-pointer"
                onClick={() => navigate(`/job-details/${job._id}`)}
              >
                <td className="py-3 px-6">{job.jobDetails.title}</td>
                <td className="py-3 px-6">{job.jobDetails.companyName}</td>
                <td className="py-3 px-6">{job.jobDetails.location}</td>
                <td className="py-3 px-6">{job.jobDetails.jobType}</td>
                {(recruiterId === user?._id ||
                  user?.emailId.email === company?.adminEmail) && (
                  <>
                    <td className="py-3 px-6">
                      {loading[job._id] ? (
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
                    </td>
                    <td className="py-3 px-6">
                      {dloading[job._id] ? (
                        "loading..."
                      ) : (
                        <button
                          onClick={(event) => deleteJob(event, job._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={20} />
                        </button>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-3 px-6 text-center">
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecruiterJob;
