import { useState, useEffect } from "react";
import axios from "axios";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa6";

import { COMPANY_API_END_POINT } from "@/utils/ApiEndPoint";
import { useSelector } from "react-redux";

const jobTitlesList = [
  // Software & IT
  "Software Engineer",
  "React Developer",
  "Java Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Engineer",
  "Cybersecurity Analyst",
  "DevOps Engineer",
  "Cloud Engineer",
  "Database Administrator",
  "Blockchain Developer",
  "Game Developer",
  "Embedded Systems Engineer",
  "Mobile App Developer",

  // Product & Management
  "Product Manager",
  "Project Manager",
  "Business Analyst",
  "Scrum Master",
  "Operations Manager",
  "Risk Manager",
  "Supply Chain Manager",

  // Sales & Marketing
  "Marketing Manager",
  "Sales Executive",
  "Digital Marketing Specialist",
  "SEO Analyst",
  "Social Media Manager",
  "Brand Manager",
  "Public Relations Specialist",

  // HR & Administration
  "Human Resources Manager",
  "Recruiter",
  "Training and Development Manager",
  "Administrative Officer",

  // Finance & Banking
  "Financial Analyst",
  "Investment Banker",
  "Accountant",
  "Auditor",
  "Tax Consultant",
  "Actuary",
  "Loan Officer",

  // Engineering
  "Civil Engineer",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Automobile Engineer",
  "Aerospace Engineer",
  "Chemical Engineer",
  "Biomedical Engineer",
  "Structural Engineer",

  // Healthcare & Medicine
  "Doctor",
  "Nurse",
  "Pharmacist",
  "Dentist",
  "Physiotherapist",
  "Radiologist",
  "Veterinarian",
  "Surgeon",

  // Legal & Law
  "Lawyer",
  "Judge",
  "Paralegal",
  "Legal Advisor",

  // Education & Research
  "Teacher",
  "Professor",
  "Research Scientist",
  "Librarian",
  "Academic Counselor",

  // Creative & Media
  "Graphic Designer",
  "UI/UX Designer",
  "Content Writer",
  "Journalist",
  "Video Editor",
  "Animator",
  "Art Director",
  "Photographer",
  "Filmmaker",
  "Fashion Designer",
  "Interior Designer",
  "Music Producer",

  // Hospitality & Tourism
  "Hotel Manager",
  "Event Planner",
  "Chef",
  "Tour Guide",
  "Travel Agent",
  "Flight Attendant",

  // Sports & Fitness
  "Athlete",
  "Fitness Trainer",
  "Sports Coach",
  "Physiotherapist",

  // Government & Public Sector
  "Police Officer",
  "Firefighter",
  "Military Officer",
  "Social Worker",
  "Diplomat",

  // Miscellaneous
  "Entrepreneur",
  "Freelancer",
  "Data Entry Operator",
  "Customer Support Representative",
];

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    jobTitle: "",
    experience: "",
    salaryBudget: "",
  });
  const [credits, setCredits] = useState(10);
  const [message, setMessage] = useState(
    "Enhance your team with talented candidates."
  );
  const {company} = useSelector((state)=>state.company);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        `${COMPANY_API_END_POINT}/candidate-list`,
        {
          params: {
            ...filters,
            companyId: company?._id, // Add your companyId here
          },
          withCredentials: true, // This ensures credentials (like cookies) are sent with the request
        }
      );
      console.log(response.data.candidates)
      setCandidates(response.data.candidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleViewCandidate = async (candidateId) => {
    try {
      if (credits <= 0)
        return alert("Insufficient credits! Please purchase more.");
      setCredits(credits - 10);
      // API call logic for viewing candidate
    } catch (error) {
      alert(error.response?.data?.error || "Error viewing candidate.");
    }
  };

  const filteredJobTitles = query
    ? jobTitlesList.filter((title) =>
        title.toLowerCase().includes(query.toLowerCase())
      )
    : jobTitlesList;

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Find Candidates</h1>
        <p className="mb-4">
          Remaining Credits: <strong>{credits}</strong>
        </p>
      </div>

      {/* Filter Form */}
      <div className="flex gap-4 mb-4 w-full justify-evenly">
        {/* Job Title Dropdown */}
        <div className="relative w-72">
          <Combobox
            value={filters.jobTitle}
            onChange={(value) => setFilters({ ...filters, jobTitle: value })}
          >
            <div className="relative">
              <ComboboxInput
                className="w-full border border-gray-400 rounded-md p-2"
                displayValue={(job) => job}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Select Job Title"
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-2">
                <FaAngleDown className="w-5 h-5 text-gray-500" />
              </ComboboxButton>
            </div>

            <ComboboxOptions className="absolute mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-lg shadow-md">
              {filteredJobTitles.length > 0 ? (
                filteredJobTitles.map((job, index) => (
                  <ComboboxOption
                    key={index}
                    value={job}
                    className="cursor-pointer select-none p-2 hover:bg-blue-100"
                  >
                    {job}
                  </ComboboxOption>
                ))
              ) : (
                <ComboboxOption
                  value={query}
                  className="cursor-pointer select-none p-2 text-gray-500"
                >
                  Create "{query}"
                </ComboboxOption>
              )}
            </ComboboxOptions>
          </Combobox>
        </div>

        <input
          type="text"
          placeholder="Min Experience (years)"
          className="p-2 border border-gray-400 rounded-md w-72"
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Max CTC eg.. 50000, 60000"
          className="p-2 border border-gray-400 rounded-md w-72"
          value={filters.salaryBudget}
          onChange={(e) =>
            setFilters({ ...filters, salaryBudget: e.target.value })
          }
        />
        <button
          className="p-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md"
          onClick={fetchCandidates}
        >
          Find Candidates
        </button>
      </div>

      {/* Candidates List */}
      <div className="grid grid-cols-3 gap-6">
        {candidates.length === 0 ? (
          <div className="col-span-3 flex items-center justify-center">
            <p className="text-2xl text-gray-500">{message}</p>
          </div>
        ) : (
          candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h2 className="text-lg font-semibold">{candidate.name}</h2>
              <p>
                <strong>Skills:</strong> {candidate.skills.join(", ")}
              </p>
              <p>
                <strong>Experience:</strong> {candidate.experience} years
              </p>
              <p>
                <strong>Salary Budget:</strong> ${candidate.salaryBudget}
              </p>
              <button
                className="mt-2 bg-green-600 text-white p-2 rounded-md disabled:bg-gray-400"
                onClick={() => handleViewCandidate(candidate._id)}
                disabled={credits <= 0}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* Buy Credits Prompt */}
      {credits <= 0 && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>
            You have 0 credits left. Please{" "}
            <a href="/pricing" className="text-blue-500 underline">
              purchase a plan
            </a>{" "}
            to continue viewing candidates.
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
