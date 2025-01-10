import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const RecruiterHome = () => {
  const { company } = useSelector((state) => state.company);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-black mb-8">
        {company?.companyName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Content1</h2>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Content2</h2>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Content3</h2>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Content4</h2>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Content5</h2>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Content6</h2>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Content7</h2>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="h-40 bg-gradient-to-r from-cyan-500 to-indigo-500 flex items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Content8</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterHome;
