import React, { useState } from "react";
import ApplyForm from "./ApplyForm";
import Navbar from "../shared/Navbar";

const MainApply = () => {
  const [right, setRight] = useState(true);

  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        {/* Left Section */}
        <div className="w-3/5 p-4">
          <ApplyForm setRight={setRight} />
        </div>

        {/* Right Section */}
        {right && (
          <div className="w-2/5 bg-gray-50 p-4">
            <div className="bg-white shadow-md border rounded-lg p-4 mx-auto mt-16 w-4/5">
              <h6 className="text-lg font-semibold mb-2">
                immediate Joiner Only
              </h6>
              <p className="text-sm font-medium text-gray-600 mb-4">
                Google - Gurgaon, Haryana
              </p>
              <div className="w-full h-px bg-gray-300 mb-4"></div>
              <ul className="list-disc list-inside text-gray-800">
                <li className="mb-2">
                  Bachelor's degree in Computer Science, Information Technology,
                  or a similar field.
                </li>
                <li className="mb-2">
                  Minimum 2 years of Experience as a React.js Developer.
                </li>
                <li className="mb-2">
                  In-depth knowledge of JavaScript, CSS, HTML, and front-end
                  languages.
                </li>
                <li className="mb-2">
                  Knowledge of REACT tools including React.js, Redux, and Flux.
                </li>
                <li className="mb-2">Experience with user interface design.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainApply;
