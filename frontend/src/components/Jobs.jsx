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
      <div>
        <div className=" flex gap-3">
          <FilterCard />
          
          {jobsArray.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 pb-5 m-2">
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
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
