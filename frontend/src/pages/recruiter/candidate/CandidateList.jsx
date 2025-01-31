import { useState } from "react";
import axios from "axios";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa6";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { COMPANY_API_END_POINT } from "@/utils/ApiEndPoint";
import { useSelector, useDispatch } from "react-redux";
import { decreaseCandidateCredits } from "@/redux/companySlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;
const jobTitles = [
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    jobTitle: "",
    experience: "",
    salaryBudget: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const { company } = useSelector((state) => state.company);
  const [message, setMessage] = useState("Find great talent for you team");

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        `${COMPANY_API_END_POINT}/candidate-list`,
        {
          params: { ...filters, companyId: company?._id },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        if (response.data.candidates.length === 0)
          setMessage("No Candidate founds");
        setCandidates(response.data.candidates);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleViewCandidate = async (candidate) => {
    try {
      const response = await axios.get(
        `${COMPANY_API_END_POINT}/decrease-credit/${company?._id}`,
        { withCredentials: true }
      );

      // Check if the API response is successful
      if (response.data.success) {
        dispatch(decreaseCandidateCredits(1));
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      toast.error("Something went wrong!");
    }
  };

  const totalPages = Math.ceil(candidates.length / ITEMS_PER_PAGE);
  const currentCandidates = candidates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="p-6 min-h-screen">
        <div className="flex justify-between border-b-2 border-gray-300 py-2">
          <h1 className="text-2xl font-bold mb-4">Find Candidates</h1>
          <div className="flex gap-2 items-center">
            <div>
              <p className="text-xl text-gray-700">
                Remaining Credits:{" "}
                <strong className="text-black">
                  {company?.creditedForCandidates}
                </strong>
              </p>
              <p className="text-gray-500">
                Viewing resume will decrease credits
              </p>
            </div>
            {company?.creditedForCandidates === 0 && (
              <Button
                className="bg-blue-700 hover:bg-blue-800"
                onClick={() => navigate("/recruiter/dashboard/candidate-plans")}
              >
                Upgrade Plan
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-4 mb-4 w-full justify-evenly">
          <Combobox
            value={filters.jobTitle}
            onChange={(value) => setFilters({ ...filters, jobTitle: value })}
          >
            <div className="relative w-72">
              <ComboboxInput
                className="p-2 border border-gray-400 rounded-md w-full"
                placeholder="Select Job Title"
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                <FaAngleDown />
              </ComboboxButton>
              <ComboboxOptions className="absolute w-full bg-white border rounded-md mt-1 shadow-lg h-40 overflow-y-scroll">
                {jobTitles.map((title) => (
                  <ComboboxOption
                    key={title}
                    value={title}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {title}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </div>
          </Combobox>
          <input
            type="text"
            placeholder="Min Experience (years)"
            className="p-2 border rounded-md w-72"
            value={filters.experience}
            onChange={(e) =>
              setFilters({ ...filters, experience: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Max CTC (₹) eg.. 50000"
            className="p-2 border rounded-md w-72"
            value={filters.salaryBudget}
            onChange={(e) =>
              setFilters({ ...filters, salaryBudget: e.target.value })
            }
          />
          <Button onClick={fetchCandidates} className="bg-blue-700 hover:bg-blue-800 text-white">
            Find Candidates
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {currentCandidates.length === 0 ? (
            <div className="col-span-3 flex items-center justify-center">
              <p className="text-4xl text-gray-400">{message}</p>
            </div>
          ) : (
            candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="flex justify-evenly items-center p-4 border rounded-lg shadow-md bg-white "
              >
                {/* User Info Section */}
                <div className="flex items-center space-x-2 ">
                  <Avatar className="h-24 w-24 shadow-lg">
                    <AvatarImage
                      src={
                        candidate?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="Profile Photo"
                      onError={(e) => (e.target.src = "/default-avatar.png")}
                    />
                  </Avatar>
                  <div>
                    <h1 className="mt-4 text-3xl font-bold text-gray-800">
                      {candidate?.fullname || "User Name"}
                    </h1>
                    <p className="text-gray-600 mt-2">
                      {candidate?.profile?.bio || "No bio available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Skills Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800  pb-2">
                      Skills
                    </h2>
                    <div className=" flex flex-wrap gap-3">
                      {candidate?.profile?.skills?.length > 0 ? (
                        candidate.profile.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            className="bg-blue-100 hover:bg-gray-200 px-4 py-2 text-blue-800 rounded-lg font-medium text-sm"
                          >
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-600">No skills listed</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>
                      <strong>Experience:</strong>{" "}
                      {candidate.profile.experience.duration} years
                    </p>
                    <p>
                      <strong>Expected CTC:</strong> ₹
                      {candidate.profile.expectedCTC}
                    </p>
                  </div>
                </div>

                <Button
                  className="bg-green-600 hover:bg-green-700 text-white rounded-md disabled:bg-gray-400"
                  onClick={async () => {
                    // First, call the API to decrease credits
                    await handleViewCandidate(candidate);

                    // Open the resume link in a new tab
                    window.open(candidate.profile.resume, "_blank");
                  }}
                  disabled={company?.creditedForCandidates <= 0}
                >
                  View Resume
                </Button>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="mr-2"
            >
              Previous
            </Button>
            <span className="px-4 py-2 border rounded-md">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="ml-2"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CandidateList;
