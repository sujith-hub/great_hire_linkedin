import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { useJobDetails } from "@/context/JobDetailsContext";

const Locations = ({ locations, onSelectLocation }) => {
  return (
    <div className="absolute top-20 left-0 bg-white border rounded-lg shadow-lg w-full max-h-64 overflow-auto z-10">
      {locations.length > 0 ? (
        locations.map((location, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectLocation(location)}
          >
            <FaLocationDot size={16} className="text-gray-500" />
            <span>{location}</span>
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">No locations found</div>
      )}
    </div>
  );
};

const SearchWithLocations = ({ onSelectLocation }) => {
  const [inputValue, setInputValue] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const { resetFilter } = useJobDetails(); // Access functions from context

  const allLocations = [
    "Jaipur, Rajasthan",
    "Delhi, Delhi",
    "Gurugram, Haryana",
    "Noida, Uttar Pradesh",
    "Lucknow, Uttar Pradesh",
    "Ahmedabad, Gujarat",
    "Bhopal, Madhya Pradesh",
    "Kolkata, West Bengal",
    "Mumbai, Maharashtra",
    "Pune, Maharashtra",
    "Hyderabad, Telangana",
    "Bengaluru, Karnataka",
    "Chennai, Tamil Nadu",
    "Remote"
  ];

  const handleFocus = () => {
    setShowLocations(true);
    setFilteredLocations(allLocations); // Show all locations when input is focused
  };

  const handleBlur = () => setTimeout(() => setShowLocations(false), 150);

  const handleLocationSelect = (location) => {
    setInputValue(location);
    setShowLocations(false);
    onSelectLocation(location);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter locations based on user input
    const filtered = allLocations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);

    setShowLocations(true);
  };

  const clearInput = () => {
    setInputValue("");
    setFilteredLocations(allLocations); // Reset the filtered list
    resetFilter();
  };

  return (
    <div className="relative flex-1 w-full">
      <div className="flex items-center border-gray-300 px-2 md:border-l-2 border-l-0 md:border-t-0 border-t-2">
        <FaLocationDot size={25} className="text-gray-500" />
        <input
          type="text"
          placeholder='Your dream location'
          className="py-3 px-2 outline-none flex-1 bg-transparent text-sm sm:text-base w-full"
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
        {inputValue && (
          <button
            type="button"
            className="mr-3 text-gray-500 hover:text-black"
            onClick={clearInput}
          >
            <MdClear size={20} />
          </button>
        )}
      </div>
      {showLocations && (
        <Locations
          locations={filteredLocations}
          onSelectLocation={handleLocationSelect}
        />
      )}
    </div>
  );
};

export default SearchWithLocations;
