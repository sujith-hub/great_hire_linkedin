import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import axios from "axios";

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
            <span>{location.description}</span>
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">No locations found</div>
      )}
    </div>
  );
};

const LocationSearch = ({ onSelectLocation }) => {
  const [inputValue, setInputValue] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const apiKey = "pk.e14db5ac88f4d29e8f6eeafdc1981a37"; // Replace with your LocationIQ API key

  const handleFocus = () => setShowLocations(true);

  const handleBlur = () => setTimeout(() => setShowLocations(false), 150);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length < 3) {
      setFilteredLocations([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search.php`,
        {
          params: {
            key: apiKey,
            q: value,
            format: "json",
            countrycodes: "IN",
            addressdetails: 1,
            language: "en",
          },
        }
      );

      const formattedSuggestions = response.data.map((item) => {
        return {
          description: `${item.address.station || ""} ${item.address.city || ""} ${item.address.state || ""} ${item.address.country || ""}`,
        };
      });

      setFilteredLocations(formattedSuggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }

    setShowLocations(true);
  };

  const clearInput = () => {
    setInputValue("");
    setFilteredLocations([]);
  };

  const handleLocationSelect = (location) => {
    setInputValue(location.description);
    setShowLocations(false);
    onSelectLocation(location);
  };

  return (
    <div className="relative flex-1 w-full">
      <div className="flex items-center border-gray-300 px-2 md:border-l-2 border-l-0 md:border-t-0 border-t-2">
        <FaLocationDot size={25} className="text-gray-500" />
        <input
          type="text"
          placeholder="Your dream location"
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

export default LocationSearch;
