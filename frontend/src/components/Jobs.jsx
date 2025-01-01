import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full mx-auto mt-5">
        <div className="flex gap-2">
          {/* Filter Section */}
          <div className="w-40 md:w-60 xl:md-80 px-4">
            <div className="sticky top-20"> {/* Makes the filter section sticky */}
              <FilterCard />
            </div>
          </div>

          {/* Jobs Section */}
          <div className="flex-1 pb-5">
            {jobsArray.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
                {jobsArray.map((item, index) => (
                  <div key={index}>
                    <Job />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;

