// src/components/HeroSection.jsx
import React, { useState } from "react";
import JobSearch from "./JobSearch";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/authSlice"; // Corrected import
import { useNavigate } from "react-router-dom";

const HeroSection = ({ searchInfo }) => {
  const [query, setQuery] = useState(""); // Declare query state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query)); // Dispatch setSearchedQuery with the query
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 sm:px-6 lg:px-12">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#0233f8] font-medium animate-bounce">
          No. 1 Job Hunt Website
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#384ac2]">Dream Jobs</span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4">
          Connecting Talent with Opportunity-Your Next Great Hire Awaits!
        </p>

        <JobSearch searchInfo={searchInfo} />
        
        {/* Search input and button */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 sm:px-8">
          {/* Search input with proper margin on smaller screens */}
          <input
            type="text"
            className="mt-2 px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-auto"
            placeholder="Search jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Handle query change
          />
          
          {/* Search button with proper margin on smaller screens */}
          <button
            onClick={searchJobHandler}
            className="mt-2 px-4 py-2 rounded-lg bg-[#384ac2] text-white font-medium w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
