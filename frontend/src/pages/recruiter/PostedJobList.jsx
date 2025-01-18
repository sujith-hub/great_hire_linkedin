import React, { useState } from "react";
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
import { useSelector } from "react-redux";

const initialJobs = [
  {
    id: 1,
    date: "07-12-2024",
    role: "Backend Developer",
    NoOfApplicants: 20,
    status: "Active",
  },
  {
    id: 2,
    date: "15-11-2024",
    role: "Frontend Developer",
    NoOfApplicants: 50,
    status: "Expired",
  },
  {
    id: 3,
    date: "01-10-2024",
    role: "Full Stack Engineer",
    NoOfApplicants: 75,
    status: "Expired",
  },
  {
    id: 4,
    date: "25-09-2024",
    role: "Data Analyst",
    NoOfApplicants: 35,
    status: "Active",
  },
  {
    id: 5,
    date: "12-09-2024",
    role: "Mobile App Developer",
    NoOfApplicants: 20,
    status: "Expired",
  },
];

const statusOptions = ["All", "Active", "Expired"];
const statusStyles = {
  Active: "bg-green-200 text-green-700 hover:bg-green-100",
  Expired: "bg-red-200 text-red-700 hover:bg-red-100",
};

const PostedJobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);

  const handlePostJob = () => {
    navigate("/recruiter/dashboard/post-job");
  };

  const handleJobDetailsClick = (jobId) => {
    navigate(`/recruiter/dashboard/job-details/${jobId}`);
  };

  const handleApplicantsClick = (jobId) => {
    navigate(`/recruiter/dashboard/applicants/${jobId}`);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {company && user.isVerify ? (
        <div className="p-5 bg-gray-50 shadow-md rounded-lg">
          <div className="mb-6">
            <div className="p-10 bg-white shadow-md rounded-lg flex justify-center items-center">
              <button
                onClick={handlePostJob}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition flex items-center"
              >
                <span className="text-2xl font-bold mr-1">+</span> Post New Job
              </button>
            </div>
          </div>

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
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Sr No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>No. of Applicants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <TableRow
                    key={job.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{job.date}</TableCell>
                    <TableCell>{job.role}</TableCell>
                    <TableCell>{job.NoOfApplicants}</TableCell>
                    <TableCell>
                      <div
                        className={`px-3 py-1 rounded-md text-sm text-center ${
                          statusStyles[job.status]
                        }`}
                      >
                        {job.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <button
                        onClick={() => handleJobDetailsClick(job.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
                      >
                        Job Details
                      </button>
                      <button
                        onClick={() => handleApplicantsClick(job.id)}
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
