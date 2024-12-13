import React, { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";


const ReportJob = () => {
  const [selectedProblem, setSelectedProblem] = useState("");
  const [description, setDescription] = useState("");

  const problems = [
    "It's offensive or harassing",
    "Asking for money or seems like a fake job",
    "Incorrect company, location or job details",
    "I think it's NOT a Job, but selling something",
    "Other",
  ];

  const handleSubmit = () => {
    if (!selectedProblem || !description) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    // Handle report submission logic here
    console.log({ selectedProblem, description });
    alert("Your report has been submitted successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg z-20 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Choose a Problem</h2>
          <button
            onClick={() => console.log("Close modal")}
            className="text-gray-500 hover:text-gray-800"
          >
            X
          </button>
        </div>

        {/* Problem Options */}
        <div className="mt-4 space-y-2 flex flex-col gap-2">
          <div>
            <p className="font-semibold">Job Title</p>
            <p className="text-gray-500 text-sm">Company Title</p>
          </div>
          {problems.map((problem, index) => (
            <div key={index} className="flex items-center space-x-2 gap-2 ">
              <input
                type="radio"
                id={`problem-${index}`}
                name="problem"
                value={problem}
                checked={selectedProblem === problem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                className="text-indigo-600"
                style={{ transform: "scale(2.5)" }}
              />
              <label
                htmlFor={`problem-${index}`}
                className="text-gray-500 font-semibold text-md"
              >
                {problem}
              </label>
            </div>
          ))}
        </div>

        {/* Description Textarea */}
        <div className="mt-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium"
          >
            Describe your problem below:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="0 / 300"
            maxLength={300}
            rows={4}
            className="w-full mt-2 border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Privacy Note */}
        <div className="mt-4 bg-blue-100 p-3 rounded-lg text-gray-600 text-sm flex gap-2 ">
          <BsFillInfoCircleFill size={35} className="text-blue-600"/>
          <div>
            <p className="font-semibold text-xl">Protect your privacy</p>
            <p className="text-gray-500 text-sm">Avoid disclosing personal information like your name, phone number, or any details that may personally identify you.</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Report to Great Hire
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportJob;
