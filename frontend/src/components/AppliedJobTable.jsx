import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const appliedJobs = [
  { date: "07-12-2024", role: "Backend Developer", company: "TechCorp", status: "Selected" },
  { date: "15-11-2024", role: "Frontend Developer", company: "Innovatech", status: "Pending" },
  { date: "01-10-2024", role: "Full Stack Engineer", company: "DevWorks", status: "Rejected" },
  { date: "25-09-2024", role: "Data Analyst", company: "AnalyzeIT", status: "Pending" },
  { date: "12-09-2024", role: "Mobile App Developer", company: "Appify", status: "Selected" },
];

const statusStyles = {
  Selected: "bg-green-200 text-green-700 hover:bg-green-100",
  Pending: "bg-yellow-200 text-yellow-700 hover:bg-yellow-100",
  Rejected: "bg-red-200 text-red-700 hover:bg-red-100",
};

const AppliedJobTable = () => {
  return (
    <div className="p-5 bg-gray-50 shadow-md rounded-lg">
      <Table className="w-full border-collapse border border-gray-200">
        <TableCaption className="text-gray-600 text-sm">
          Below is the list of jobs you have applied for.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.map((job, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition duration-150"
            >
              <TableCell className="text-gray-700">{job.date}</TableCell>
              <TableCell className="text-gray-800 font-medium">
                {job.role}
              </TableCell>
              <TableCell className="text-gray-800 font-medium">
                {job.company}
              </TableCell>
              <TableCell className="text-right">
                <Badge className={`px-2 py-1  rounded-md ${statusStyles[job.status]}`}>
                  {job.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
