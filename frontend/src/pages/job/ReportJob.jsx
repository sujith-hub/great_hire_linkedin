// Importing React and useState for state management
import React, { useState } from "react"; 
// Importing an info icon for UI
import { BsFillInfoCircleFill } from "react-icons/bs";
// Importing useNavigate for navigation 
import { useNavigate } from "react-router-dom"; 
// Importing toast notifications for user feedback
import { toast } from "react-hot-toast";
// Importing job details context 
import { useJobDetails } from "@/context/JobDetailsContext";
// Importing axios for making API requests 
import axios from "axios"; 
// Importing API endpoint for job reports
import { COMPANY_API_END_POINT } from "@/utils/ApiEndPoint"; 

const ReportJob = () => {
  const { selectedJob } = useJobDetails(); // Getting selected job details from context
  const navigate = useNavigate(); // Initializing navigation function

  // State variables for selected problem and additional description
  const [selectedProblem, setSelectedProblem] = useState("");
  const [description, setDescription] = useState("");
  const maxChars = 300; // Maximum allowed characters for the description field

  // Function to handle changes in the description input field
  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setDescription(e.target.value);
    }
  };

  // List of predefined problems users can report
  const problems = [
    "It's offensive or harassing",
    "Asking for money or seems like a fake job",
    "Incorrect company, location or job details",
    "I think it's NOT a Job, but selling something",
    "Other",
  ];

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!selectedProblem) {
      toast.error("Please select a problem before submitting."); // Show error if no problem is selected
      return;
    }
    if (selectedProblem === "Other" && !description) {
      toast.error("Please provide a description for 'Other'."); // Require description for 'Other' option
      return;
    }

    try {
      // Sending report details to the API
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/report-job`,
        {
          jobId: selectedJob?._id, // Sending the selected job's ID
          reportTitle: selectedProblem, // Report issue title
          description, // Additional description if provided
        },
        { withCredentials: true } // Ensuring cookies are sent for authentication
      );

      // Handling the response from the server
      if (response.data.success) {
        toast.success(response.data.message); // Show success notification
        navigate(-1); // Navigate back to the previous page
      } else {
        toast.error(response.data.message); // Show error notification if submission failed
      }
    } catch (error) {
      toast.error("Failed to submit the report. Please try again later."); // Handle API errors
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full flex flex-col">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Report a Job</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-800"
          >
            ✖
          </button>
        </div>

        <div className="mt-4">
          <p className="font-semibold text-gray-800">
            {selectedJob?.jobDetails?.title}
          </p>
          <p className="text-gray-500 text-sm">
            {selectedJob?.jobDetails?.companyName}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {problems.map((problem, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="problem"
                value={problem}
                checked={selectedProblem === problem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 flex items-center justify-center border rounded-full ${
                  selectedProblem === problem
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-400"
                }`}
              >
                {selectedProblem === problem && (
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                )}
              </span>
              <span className="text-gray-600">{problem}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium">
            Describe your problem:
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            maxLength={maxChars}
            rows={4}
            className="w-full mt-2 border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p className="text-right text-sm text-gray-500">
            {description.length}/{maxChars} characters
          </p>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg text-gray-600 text-sm flex gap-2">
          <BsFillInfoCircleFill size={20} className="text-blue-600" />
          <span>
            Do not disclose personal details like your name or phone number.
          </span>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Report to Great Hire
        </button>
      </div>
    </div>
  );
};

export default ReportJob;

