// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWNydWl0ZXJJZCI6IjY3NmE2NTU5MzNkOTFhZGM4NTE0YTczZiIsImNvbXBhbnlJZCI6IjY3NmE4MDZjYjQ3ZmFlNTYyZmUxYTA2NCIsImlhdCI6MTczNTAzMjk0MCwiZXhwIjoxNzM1MTE5MzQwfQ.QpxiOtNH7eOU_gXdZK9MCgEcibnUzObX-iJeFuuqyIE
// import React from "react";
// import { useSelector } from "react-redux";

// const { user } = useSelector((state) => state.auth);
// return (
//   <>
//     {user.isVerify === 1 ? (
//       <>
//         <p>Post job form</p>
//       </>
//     ) : (
//       <>
//         <p>You are not verified </p>
//       </>
//     )}
//   </>
// );

import React, { useState, useRef } from "react";
import { ProgressBar } from "react-step-progress-bar";
import { BiArrowBack } from "react-icons/bi";
import RecruiterReviewPage from "./RecruiterReviewPage";
import { Link } from "react-router-dom";
import JobTypeSelector from "./JobTypeSelector";
import ExperienceLevelSelector from "./ExperienceLevelSelector";
import ScheduleSelector from "./ScheduleSelector";
import CompensationPackageBenefits from "./CompensationPackageBenefits";
import "react-step-progress-bar/styles.css";

const PostJob = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [review, setReview] = useState(false);
  const inputRef = useRef();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinue1 = (e) => {
    e.preventDefault();
    setStep1(false);
    setStep2(true);
  };

  const handleContinue2 = () => {
    setStep2(false);
    setStep3(true);
  };

  const handleReview = () => {
    setStep3(false);
    setReview(true);
    setRight(false);
  };

  const handleReview1 = () => {
    setReview(false);
    setStep3(true);
  };

  const handleChoose = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      {step1 && (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
          <ProgressBar percent={25} unfilledBackground="gray" />
          <h6 className="text-sm text-gray-500 mt-2">
            Application step 1 of 4
          </h6>
          <div className="mb-6">
            <h4 className="text-xl font-semibold my-4 text-center">
              Add job basics
            </h4>
          </div>
          <form>
            {/* Company Description Section */}
            <div className="mb-6">
              <label htmlFor="companyDescription" className="font-semibold">
                Company description
              </label>
              <h6 className="text-sm">
                Introduce your company to people in a few lines.
              </h6>
              <textarea
                name="companyDescription"
                onChange={handleChange}
                rows="3"
                className={`mt-2 w-full p-2 border ${
                  errors.companyDescription
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md`}
                placeholder="Present your company by communicating, your business, your market position, your company culture, etc."
              ></textarea>
              {errors.companyDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyDescription}
                </p>
              )}
            </div>

            {/* Job Title Section */}
            <div className="mb-6">
              <label
                htmlFor="jobTitle"
                className="font-semibold flex items-center"
              >
                Job title <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="jobTitle"
                onChange={handleChange}
                className={`mt-2 w-full p-2 border ${
                  errors.jobTitle ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                required
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
              )}
            </div>

            {/* Job Location Type Section */}
            <div className="mb-6">
              <label
                htmlFor="jobLocationType"
                className="font-semibold flex items-center"
              >
                Job Location Type <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="jobLocationType"
                onChange={handleChange}
                className={`mt-2 w-full p-2 border ${
                  errors.jobLocationType ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                required
              >
                <option value="">Select</option>
                <option value="In-person">In-person</option>
                <option value="Fully Remote">Fully Remote</option>
                <option value="On-site work required">
                  On-site work required
                </option>
              </select>
              {errors.jobLocationType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobLocationType}
                </p>
              )}
            </div>

            {/* Street Address Section */}
            <div className="mb-6">
              <label
                htmlFor="streetAddress"
                className="font-semibold flex items-center"
              >
                Street Address <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                onChange={handleChange}
                className={`mt-2 w-full p-2 border ${
                  errors.streetAddress ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                required
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.streetAddress}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end items-center mt-6">
              <button
                onClick={handleContinue1}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Have feedback?{" "}
              <Link to="/contact" className="text-blue-700 cursor-pointer">
                Tell us more
              </Link>
            </p>
          </form>
        </div>
      )}

      {step2 && (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
          <ProgressBar percent={50} unfilledBackground="gray" />

          <div className="flex items-center mt-4">
            <BiArrowBack
              className="text-gray-600 cursor-pointer"
              onClick={() => {
                setStep2(false);
                setStep1(true);
              }}
            />

            <h6 className="ml-2 text-sm text-gray-500">
              Application step 2 of 4
            </h6>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-bold mt-6 text-center">
              Add job details{" "}
            </h4>
          </div>

          <div className="mb-6">
            <label
              htmlFor="jobType"
              className="font-semibold flex items-center"
            >
              Job type
              <span className="text-red-500 ml-1">*</span>
            </label>
            <JobTypeSelector />
          </div>

          <div className="mb-6">
            <label
              htmlFor="experienceLevel"
              className="font-semibold flex items-center"
            >
              Experience Level
            </label>
            <ExperienceLevelSelector />
          </div>

          <div className="mb-6">
            <label
              htmlFor="schedule"
              className="font-semibold flex items-center"
            >
              Schedule
            </label>
            <ScheduleSelector />
          </div>

          <div className="mb-6">
            <label
              htmlFor="hiringPeople"
              className="font-semibold flex items-center"
            >
              No of people to hire for this job
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="hiringPeople"
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="In-person">Select an option</option>
              <option value="In-person">1</option>
              <option value="In-person">2</option>
              <option value="In-person">3</option>
              <option value="In-person">4</option>
              <option value="In-person">5</option>
              <option value="In-person">6</option>
              <option value="In-person">7</option>
              <option value="In-person">8</option>
              <option value="In-person">9</option>
              <option value="In-person">10</option>
              <option value="In-person">10+</option>
              <option value="In-person">
                I have an ongoing need to fill this role.
              </option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="hiringTimeline"
              className="font-semibold flex items-center"
            >
              Hiring timeline for this job{" "}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="hiringTimeline"
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="In-person">Select an option</option>
              <option value="In-person">2 days</option>
              <option value="In-person">7 days</option>
              <option value="In-person">15 days</option>
              <option value="In-person">30 days</option>
              <option value="In-person">45 days</option>
            </select>
          </div>

          <div className="flex justify-end items-center mt-6">
            <button
              onClick={handleContinue2}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Continue
            </button>
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">
            Have feedback?{" "}
            <Link to="/contact" className="text-blue-500 cursor-pointer">
              Tell us more
            </Link>
          </p>
        </div>
      )}

      {step3 && (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
          <ProgressBar percent={75} unfilledBackground="gray" />

          <div className="flex items-center mt-4">
            <BiArrowBack
              className="text-gray-600 cursor-pointer"
              onClick={() => {
                setStep3(false);
                setStep2(true);
              }}
            />

            <h6 className="ml-2 text-sm text-gray-500 my-4">
              Application step 3 of 4
            </h6>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold my-4 text-center">
              Add benefits
            </h4>
          </div>
          <CompensationPackageBenefits />
          <div className="flex justify-between items-center mt-6">
            <Link
              to="/recruiter/dashboard/home"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Exit
            </Link>
            <button
              onClick={handleReview}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Review your job
            </button>
          </div>

          <p className="text-sm text-center text-gray-600 mt-4">
            Have feedback?{" "}
            <Link to="/contact" className="text-blue-500 cursor-pointer">
              Tell us more
            </Link>
          </p>
        </div>
      )}
      {review && (
        <RecruiterReviewPage
          formData={formData}
          handleReview1={handleReview1}
        />
      )}
    </div>
  );
};

export default PostJob;
