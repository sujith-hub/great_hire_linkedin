import React, { useState } from "react";

const ScheduleSelector = () => {
  const [showMore, setShowMore] = useState(false);
  const [scheduleSelector, setScheduleSelector] = useState([]);

  const scheduleTypes = [
    "4 hour shift",
    "8 hour shift",
    "10 hour shift",
    "12 hour shift",
    "Monday to friday",
    "Day shift",
    "Night shift",
    "Evening shift",
    "No Nights",
    "Overnight shift",
    "Weekends as needed",
    "Weekends only",
    "no weekends",
    "On call",
    "Holidays",
    "Choose your own hours",
    "After school",
    "Overtime ",
    "Other",
  ];

  const handleScheduleTypeClick = (type) => {
    if (scheduleSelector.includes(type)) {
      setScheduleSelector(scheduleSelector.filter((item) => item !== type));
    } else {
      setScheduleSelector([...scheduleSelector, type]);
    }
  };

  const handleShowMoreToggle = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-2">
        {(showMore ? scheduleTypes : scheduleTypes.slice(0, 9)).map((type) => (
          <button
            key={type}
            onClick={() => handleScheduleTypeClick(type)}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              scheduleSelector.includes(type)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            <span
              className={`font-bold ${
                scheduleSelector.includes(type)
                  ? "text-lg"
                  : "text-xl text-gray-700"
              }`}
            >
              {scheduleSelector.includes(type) ? "✔" : "+"}
            </span>{" "}
            {type}
          </button>
        ))}
      </div>
      <button
        onClick={handleShowMoreToggle}
        className="mt-4 text-blue-500 underline"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default ScheduleSelector;
