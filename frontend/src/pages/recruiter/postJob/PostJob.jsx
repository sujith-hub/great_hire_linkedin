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
import { Label } from "@/components/ui/label";

const PostJob = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [review, setReview] = useState(false);
  const inputRef = useRef();

  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});

  const handleContinue1 = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation checks
    if (!formData.jobTitle) newErrors.jobTitle = "Job title is required.";
    if (!formData.jobLocationType)
      newErrors.jobLocationType = "Job location type is required.";
    if (!formData.streetAddress)
      newErrors.streetAddress = "Street address is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Proceed to the next step
      setStep1(false);
      setStep2(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinue2 = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation checks
    if (!formData.salary) newErrors.salary = "Salary is required.";
    if (!formData.skills) newErrors.skills = "Skills is required.";
    if (!formData.education) newErrors.education = "Education is required.";
    if (!formData.hiringPeople || formData.hiringPeople === "Select an option")
      newErrors.hiringPeople = "Number of people to hire is required.";
    if (
      !formData.hiringTimeline ||
      formData.hiringTimeline === "Select an option"
    )
      newErrors.hiringTimeline = "Hiring timeline is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Proceed to the next step
      setStep2(false);
      setStep3(true);
    }
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
          <ProgressBar
            percent={25}
            filledBackground="linear-gradient(to right, #4972e3, #0944e6)"
          />
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
              <Label htmlFor="companyDescription" className="font-semibold">
                Company description
              </Label>
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
            </div>

            {/* Job Title Section */}
            <div className="mb-6">
              <Label
                htmlFor="jobTitle"
                className="font-semibold flex items-center"
              >
                Job title <span className="text-red-500 ml-1">*</span>
              </Label>
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
              <Label
                htmlFor="jobLocationType"
                className="font-semibold flex items-center"
              >
                Job Location Type <span className="text-red-500 ml-1">*</span>
              </Label>
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
              <Label
                htmlFor="streetAddress"
                className="font-semibold flex items-center"
              >
                Street Address <span className="text-red-500 ml-1">*</span>
              </Label>
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

            {/* Language Section */}
            <div className="mb-6">
              <Label
                htmlFor="language"
                className="font-semibold flex items-center"
              >
                Languages
              </Label>
              <input
                type="text"
                name="language"
                onChange={handleChange}
                className="mt-2 w-full p-2 border rounded-md"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end items-center mt-6">
              <button
                onClick={handleContinue1}
                className="bg-blue-700 text-white px-4 py-2 rounded-md"
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
          <ProgressBar
            percent={50}
            filledBackground="linear-gradient(to right, #4972e3, #0944e6)"
          />

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
              Add job details
            </h4>
          </div>

          <div className="mb-6">
            <Label
              htmlFor="jobType"
              className="font-semibold flex items-center"
            >
              Job type
            </Label>
            <JobTypeSelector
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="experienceLevel"
              className="font-semibold flex items-center"
            >
              Experience Level
            </Label>
            <ExperienceLevelSelector />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="schedule"
              className="font-semibold flex items-center"
            >
              Schedule
            </Label>
            <ScheduleSelector />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="hiringPeople"
              className="font-semibold flex items-center"
            >
              No of people to hire for this job
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <select
              name="hiringPeople"
              value={formData.hiringPeople}
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select an option</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="10+">10+</option>
            </select>
            {errors.hiringPeople && (
              <p className="text-red-500 text-sm">{errors.hiringPeople}</p>
            )}
          </div>

          <div className="mb-6">
            <Label
              htmlFor="hiringTimeline"
              className="font-semibold flex items-center"
            >
              Hiring timeline for this job{" "}
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <select
              name="hiringTimeline"
              value={formData.hiringTimeline}
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select an option</option>
              <option value="2 days">2 days</option>
              <option value="7 days">7 days</option>
              <option value="15 days">15 days</option>
              <option value="30 days">30 days</option>
            </select>
            {errors.hiringTimeline && (
              <p className="text-red-500 text-sm">{errors.hiringTimeline}</p>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="salary" className="font-semibold flex items-center">
              Salary <span className="text-red-500 ml-1">*</span>
            </Label>
            <input
              type="text"
              name="salary"
              onChange={handleChange}
              className={`mt-2 w-full p-2 border ${
                errors.salary ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
            )}
          </div>

          <div className="mb-6">
            <Label
              htmlFor="education"
              className="font-semibold flex items-center"
            >
              Education <span className="text-red-500 ml-1">*</span>
            </Label>
            <input
              type="text"
              name="education"
              onChange={handleChange}
              className={`mt-2 w-full p-2 border ${
                errors.education ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {errors.education && (
              <p className="text-red-500 text-sm mt-1">{errors.education}</p>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="skills" className="font-semibold flex items-center">
              Skills <span className="text-red-500 ml-1">*</span>
            </Label>
            <input
              type="text"
              name="skills"
              onChange={handleChange}
              className={`mt-2 w-full p-2 border ${
                errors.skills ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
            )}
          </div>

          <div className="flex justify-end items-center mt-6">
            <button
              onClick={handleContinue2}
              className="bg-blue-700 text-white px-4 py-2 rounded-md"
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
          <ProgressBar
            percent={75}
            filledBackground="linear-gradient(to right, #4972e3, #0944e6)"
          />

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
              className="bg-blue-700 text-white px-4 py-2 rounded-md"
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
