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
import { FiSearch, FiEye, FiDownload } from "react-icons/fi";

const initialApplicants = [
  {
    id: 1,
    name: "Faraz",
    email: "abcd121@gmail.com",
    resume: "faraz.pdf",
    status: "Pending",
  },
  {
    id: 2,
    name: "Ali",
    email: "ali123@gmail.com",
    resume: "nazir_resume.pdf",
    status: "Selected",
  },
  {
    id: 3,
    name: "Ahmed",
    email: "ahmed@gmail.com",
    resume: "ahmed_resume.pdf",
    status: "Pending",
  },
  {
    id: 4,
    name: "Sara",
    email: "sara@gmail.com",
    resume: "sara_resume.pdf",
    status: "Selected",
  },
  {
    id: 5,
    name: "Hina",
    email: "hina@gmail.com",
    resume: "hina_resume.pdf",
    status: "Rejected",
  },
];

const statusOptions = ["All", "Pending", "Selected", "Rejected"];
const statusStyles = {
  Pending: "bg-yellow-200 text-yellow-700 hover:bg-yellow-100",
  Selected: "bg-green-200 text-green-700 hover:bg-green-100",
  Rejected: "bg-red-200 text-red-700 hover:bg-red-100",
};

const AppliedCandidatesList = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState(initialApplicants);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch = applicant.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || applicant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewResume = (resume) => {
    // Open the resume in a new tab
    window.open(`/resumes/${resume}`, "_blank");
  };

  const handleDownloadResume = (resume) => {
    // Trigger a download of the resume
    const link = document.createElement("a");
    link.href = `/resumes/${resume}`;
    link.download = resume;
    link.click();
  };

  return (
    <div className="p-5 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center underline">
        Applied Candidates List
      </h1>

      <div className="flex flex-wrap justify-between mb-4 gap-4">
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name"
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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((applicant, index) => (
              <TableRow
                key={applicant.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{applicant.name}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewResume(applicant.resume)}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="View Resume"
                    >
                      <FiEye size={20} />
                    </button>
                    <button
                      onClick={() => handleDownloadResume(applicant.resume)}
                      className="text-green-500 hover:text-green-700 transition"
                      title="Download Resume"
                    >
                      <FiDownload size={20} />
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`px-3 py-1 rounded-md text-sm text-center ${
                      statusStyles[applicant.status]
                    }`}
                  >
                    {applicant.status}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6" className="text-center text-gray-500 py-4">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedCandidatesList;
