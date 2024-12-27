import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { useJobDetails } from "@/context/JobDetailsContext";

const Locations = ({ locations, onSelectLocation }) => {
  return (
    <div className="absolute top-16 left-0 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-64 overflow-auto z-20">
      {locations.length > 0 ? (
        locations.map((location, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 px-4 py-2 hover:bg-blue-50 cursor-pointer"
            onClick={() => onSelectLocation(location)}
          >
            <FaLocationDot size={18} className="text-blue-500" />
            <span className="text-gray-700 text-sm md:text-base">
              {location}
            </span>
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">No locations found</div>
      )}
    </div>
  );
};

const LocationSearch = ({ onSelectLocation }) => {
  const allLocations = {
    "Andhra Pradesh": [
      "Visakhapatnam, Andhra Pradesh",
      "Vijayawada, Andhra Pradesh",
      "Guntur, Andhra Pradesh",
    ],
    "Arunachal Pradesh": [
      "Itanagar, Arunachal Pradesh",
      "Tawang, Arunachal Pradesh",
      "Pasighat, Arunachal Pradesh",
    ],
    Assam: ["Guwahati, Assam", "Silchar, Assam", "Dibrugarh, Assam"],
    Bihar: ["Patna, Bihar", "Gaya, Bihar", "Bhagalpur, Bihar"],
    Chhattisgarh: [
      "Raipur, Chhattisgarh",
      "Bilaspur, Chhattisgarh",
      "Durg, Chhattisgarh",
    ],
    Delhi: ["New Delhi, Delhi", "Rohini, Delhi", "Dwarka, Delhi"],
    Goa: ["Panaji, Goa", "Margao, Goa", "Vasco da Gama, Goa"],
    Gujarat: ["Ahmedabad, Gujarat", "Surat, Gujarat", "Vadodara, Gujarat"],
    Haryana: ["Gurugram, Haryana", "Faridabad, Haryana", "Karnal, Haryana"],
    "Himachal Pradesh": [
      "Shimla, Himachal Pradesh",
      "Manali, Himachal Pradesh",
      "Dharamshala, Himachal Pradesh",
    ],
    Jharkhand: [
      "Ranchi, Jharkhand",
      "Jamshedpur, Jharkhand",
      "Dhanbad, Jharkhand",
    ],
    "Jammu and Kashmir": [
      "Srinagar, Jammu and Kashmir",
      "Jammu, Jammu and Kashmir",
      "Anantnag, Jammu and Kashmir",
    ],
    Karnataka: [
      "Bengaluru, Karnataka",
      "Mysuru, Karnataka",
      "Hubli, Karnataka",
    ],
    Kerala: [
      "Thiruvananthapuram, Kerala",
      "Kochi, Kerala",
      "Kozhikode, Kerala",
    ],
    Ladakh: ["Leh, Ladakh", "Kargil, Ladakh"],
    "Madhya Pradesh": [
      "Bhopal, Madhya Pradesh",
      "Indore, Madhya Pradesh",
      "Gwalior, Madhya Pradesh",
    ],
    Maharashtra: [
      "Mumbai, Maharashtra",
      "Pune, Maharashtra",
      "Nagpur, Maharashtra",
    ],
    Manipur: ["Imphal, Manipur", "Bishnupur, Manipur", "Thoubal, Manipur"],
    Meghalaya: ["Shillong, Meghalaya", "Tura, Meghalaya", "Jowai, Meghalaya"],
    Mizoram: ["Aizawl, Mizoram", "Lunglei, Mizoram", "Champhai, Mizoram"],
    Nagaland: ["Kohima, Nagaland", "Dimapur, Nagaland", "Mokokchung, Nagaland"],
    Odisha: ["Bhubaneswar, Odisha", "Cuttack, Odisha", "Rourkela, Odisha"],
    Punjab: ["Ludhiana, Punjab", "Amritsar, Punjab", "Jalandhar, Punjab"],
    Rajasthan: ["Alwar, Rajasthan", "Jaipur, Rajasthan", "Udaipur, Rajasthan"],
    Sikkim: ["Gangtok, Sikkim", "Namchi, Sikkim", "Gyalshing, Sikkim"],
    "Tamil Nadu": [
      "Chennai, Tamil Nadu",
      "Coimbatore, Tamil Nadu",
      "Madurai, Tamil Nadu",
    ],
    Telangana: [
      "Hyderabad, Telangana",
      "Warangal, Telangana",
      "Nizamabad, Telangana",
    ],
    Tripura: ["Agartala, Tripura", "Udaipur, Tripura", "Kailashahar, Tripura"],
    "Uttar Pradesh": [
      "Noida, Uttar Pradesh",
      "Lucknow, Uttar Pradesh",
      "Kanpur, Uttar Pradesh",
    ],
    Uttarakhand: [
      "Dehradun, Uttarakhand",
      "Haridwar, Uttarakhand",
      "Nainital, Uttarakhand",
    ],
    "West Bengal": [
      "Kolkata, West Bengal",
      "Darjeeling, West Bengal",
      "Siliguri, West Bengal",
    ],
  };

  const [inputValue, setInputValue] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const { resetFilter } = useJobDetails();

  const handleFocus = () => {
    setShowLocations(true);
    setFilteredLocations(Object.values(allLocations).flat());
  };

  const handleBlur = () => setTimeout(() => setShowLocations(false), 150);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const allLocationsArray = Object.values(allLocations).flat();
    const filtered = allLocationsArray.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);
    setShowLocations(true);
  };

  const handleLocationSelect = (location) => {
    setInputValue(location); // Update the input with the selected location
    setShowLocations(false); // Close the dropdown
    onSelectLocation(location); // Notify the parent
  };

  const clearInput = () => {
    setInputValue("");
    setFilteredLocations(Object.values(allLocations).flat());
    onSelectLocation("");
    resetFilter();
  };

  return (
    <div className="relative flex flex-col items-center w-full md:w-96 mx-auto">
      <div className="relative flex items-center w-full border-l-0 md:border-l-2 border-t-2 md:border-t-0 border-gray-300 overflow-hidden bg-white">
        <FaLocationDot size={25} className="text-gray-500 ml-3" />
        <input
          type="text"
          placeholder="Enter a location (e.g., Noida, Lucknow)"
          className="py-3 px-4 outline-none flex-1 text-sm sm:text-base text-gray-700 bg-transparent"
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
        {inputValue && (
          <button
            type="button"
            className="mr-3 text-gray-500 hover:text-red-500"
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