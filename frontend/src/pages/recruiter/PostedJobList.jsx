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

const initialJobs = [
  {
    date: "07-12-2024",
    role: "Backend Developer",
    company: "TechCorp",
    status: "Active",
  },
  {
    date: "15-11-2024",
    role: "Frontend Developer",
    company: "Innovatech",
    status: "Expired",
  },
  {
    date: "01-10-2024",
    role: "Full Stack Engineer",
    company: "DevWorks",
    status: "Expired",
  },
  {
    date: "25-09-2024",
    role: "Data Analyst",
    company: "AnalyzeIT",
    status: "Active",
  },
  {
    date: "12-09-2024",
    role: "Mobile App Developer",
    company: "Appify",
    status: "Expired",
  },
];

const statusOptions = ["Active", "Expired"];
const statusStyles = {
  Active: "bg-green-200 text-green-700 hover:bg-green-100",
  Expired: "bg-red-200 text-red-700 hover:bg-red-100",
};

const PostedJobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(initialJobs);

  const handlePostJob = () => {
    navigate("/recruiter/dashboard/post-job"); // Navigate to the job form
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedJobs = jobs.map((job, i) =>
      i === index ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
  };

  return (
    <div className="p-5 bg-gray-50 shadow-md rounded-lg">
      {/* Post Job Button in a Card */}
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

      {/* Table Section */}
      <Table className="w-full border-collapse border border-gray-200">
        <TableCaption className="underline mb-6 text-gray-800 text-lg font-bold text-center caption-top">
          Posted Job List
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Sr No.</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>No. of Applicants</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition duration-150"
            >
              <TableCell className="text-gray-700">{index + 1}</TableCell>
              <TableCell className="text-gray-700">{job.date}</TableCell>
              <TableCell className="text-gray-800 font-medium">
                {job.company}
              </TableCell>

              <TableCell className="text-gray-800 font-medium">
                {job.role}
              </TableCell>
              <TableCell className="text-gray-800 font-medium">
                {job.company}
              </TableCell>
              <TableCell className="text-right">
                <div
                  className={`px-3 py-1 rounded-md text-sm text-center ${
                    statusStyles[job.status]
                  } transition`}
                >
                  {job.status}
                </div>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostedJobList;
