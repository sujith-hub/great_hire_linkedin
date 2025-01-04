import React, { useState } from "react";

const ExperienceLevelSelector = () => {
  const [selectedExperienceTypes, setSelectedExperienceTypes] = useState([]);

  const experienceTypes = [
    "No Experience needed",
    "Under 1 year",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "7 years",
    "8 years",
    "9 years",
    "10 years",
    "11+ years",
    "Other",
  ];

  const handleExperienceTypeClick = (type) => {
    if (selectedExperienceTypes.includes(type)) {
      // Remove the type if it's already selected
      setSelectedExperienceTypes(
        selectedExperienceTypes.filter((job) => job !== type)
      );
    } else {
      // Add the type if it's not already selected
      setSelectedExperienceTypes([...selectedExperienceTypes, type]);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-2">
        {experienceTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleExperienceTypeClick(type)}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              selectedExperienceTypes.includes(type)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            <span
              className={`font-bold ${
                selectedExperienceTypes.includes(type)
                  ? "text-lg"
                  : "text-xl text-gray-700"
              }`}
            >
              {selectedExperienceTypes.includes(type) ? "✔ " : "+ "}
            </span>{" "}
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExperienceLevelSelector;
