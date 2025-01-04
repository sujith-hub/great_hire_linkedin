import React, { useState } from "react";

const JobTypeSelector = () => {
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);

  const jobTypes = [
    "Full Time",
    "Part Time",
    "Contract",
    "Temporary",
    "Permanent",
    "Internship",
    "Apprenticeship",
  ];

  const handleJobTypeClick = (type) => {
    if (selectedJobTypes.includes(type)) {
      // Remove the type if it's already selected
      setSelectedJobTypes(selectedJobTypes.filter((job) => job !== type));
    } else {
      // Add the type if it's not already selected
      setSelectedJobTypes([...selectedJobTypes, type]);
    }
  };

  return (
    <div>
      {/* <label
        htmlFor="jobType"
        className="font-semibold flex items-center"
      >
        Job type
        <span className="text-red-500 ml-1">*</span>
      </label> */}
      <div className="flex flex-wrap gap-2 mt-2">
        {jobTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleJobTypeClick(type)}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              selectedJobTypes.includes(type)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            <span
              className={`font-bold ${
                selectedJobTypes.includes(type)
                  ? "text-lg"
                  : "text-xl text-gray-700"
              }`}
            >
              {selectedJobTypes.includes(type) ? "✔ " : "+ "}
            </span>{" "}
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobTypeSelector;
