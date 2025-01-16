import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const RecruiterHome = () => {
  const { company } = useSelector((state) => state.company);

  return (
    <div className=" min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 animate-bounce">
        {company?.companyName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Number of recruiter */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className=" h-40 bg-gradient-to-r from-blue-500 to-indigo-500 flex flex-col space-y-2 items-center justify-center">
            <h2 className="text-white text-2xl font-bold"> Recruiters</h2>
            <h2 className="text-white text-2xl font-semibold">3</h2>
          </div>
        </div>

        {/* Number of posted job */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-green-500 to-teal-500 flex flex-col space-y-2 items-center justify-center">
            <h2 className="text-white text-2xl font-bold">Posted Job</h2>
            <h2 className="text-white text-2xl font-semibold">3</h2>
          </div>
        </div>

        {/* Max job post */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-gray-500 to-gray-700 flex flex-col space-y-2 items-center justify-center">
            <h2 className="text-white text-2xl font-bold">Max Post Job</h2>
            <h2 className="text-white text-2xl font-semibold">10</h2>
          </div>
        </div>

        {/* Number of active job */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col space-y-2 items-center justify-center">
            <h2 className="text-white text-2xl font-bold">Active Job</h2>
            <h2 className="text-white text-2xl font-semibold">3</h2>
          </div>
        </div>

        {/* Number of expired job */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-orange-500 to-yellow-500 flex flex-col space-y-2 items-center justify-center">
            <h2 className="text-white text-2xl font-bold">Expired Job</h2>
            <h2 className="text-white text-2xl font-semibold">0</h2>
          </div>
        </div>

        {/* Total Applicants */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-red-500 to-pink-500 flex flex-col space-y-2 items-center justify-center">
            <h2 className="text-white text-2xl font-bold">Applicants</h2>
            <h2 className="text-white text-2xl font-semibold">100</h2>
          </div>
        </div>

        {/* Selected */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-teal-500 to-blue-500 flex flex-col space-y-2 items-center justify-center">
            <h2 className="text-white text-2xl font-bold">
              Selected Candidates
            </h2>
            <h2 className="text-white text-2xl font-semibold">0</h2>
          </div>
        </div>

        {/* Downloaded Resume */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-indigo-500 to-red-500 flex flex-col space-y-2 items-center justify-center">
            <h2 className="text-white text-2xl font-bold">Downloaded Resume</h2>
            <h2 className="text-white text-2xl font-semibold">50</h2>
          </div>
        </div>

        {/* Max Resume download */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-cyan-500 to-indigo-500 flex flex-col space-y-2 items-center justify-center">
            <h2 className="text-white text-2xl font-bold text-center">
              {" "}
              <p>Max Download</p>
              <p className="text-center">Resume</p>
            </h2>
            <h2 className="text-white text-2xl font-semibold">100</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterHome;
