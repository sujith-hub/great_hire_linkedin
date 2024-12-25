import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FilterCard from "./FilterCard";
import Job from "./Job";
import JobSearch from "./JobSearch";
import LocationSearch from "./LocationSearch";


const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mt-5">
        <div className="flex gap-3">
          <div className="w-35">
            <FilterCard />
          </div>
          {jobsArray.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobsArray.map((item, index) => (
                  <div>
                    <Job/>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    <Footer />
    </div>
  );
};

export default Jobs;
