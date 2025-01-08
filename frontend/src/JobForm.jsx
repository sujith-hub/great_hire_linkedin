import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Stepper from "react-stepper-horizontal";

const JobForm = () => {
  const [step, setStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      urgentHiring: "",
      title: "",
      details: "",

      skills: [],
      benefits: [],
      qualifications: [],
      responsibilities: [],

      experience: "",
      salary: "",
      jobType: "",
      location: "",

      numberOfOpening: "",
      respondTime: "",
      duration: "",
      jobValidityInDays: "",
    },
    validationSchema: Yup.object({
      urgentHiring: Yup.string().required("This field is required"),
      title: Yup.string().required("Job title is required"),
      details: Yup.string().required("Job details are required"),
      salary: Yup.string().required("Salary is required"),
      experience: Yup.string().required("Experience is required"),
      jobType: Yup.string().required("Job type is required"),
      location: Yup.string().required("Location is required"),
      companyName: Yup.string().required("Company name is required"),
      numberOfOpening: Yup.string().required("Number of openings is required"),
      respondTime: Yup.string().required("Response time is required"),
      duration: Yup.string().required("Duration is required"),
      jobValidityInDays: Yup.string().required(
        "Job validity in days is required"
      ),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      // Send data to the backend via an API call
    },
  });

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    { title: "Basic Info" },
    { title: "Requirements" },
    { title: "Job Details" },
    { title: "Additional Info" },
    { title: "Review & Submit" },
  ];

  return (
    <div className="container mx-auto p-4">
      <Stepper steps={steps} activeStep={step} />

      <form onSubmit={formik.handleSubmit}>
        {step === 0 && (
          <>
            {/* Company Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Company Name</label>
              <input
                name="companyName"
                type="text"
                placeholder="Enter company name"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.companyName}
              />
              {formik.errors.companyName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.companyName}
                </div>
              )}
            </div>

            {/* Urgent Hiring or not */}
            <div className="mb-4">
              <label className="block text-gray-700">Urgent Hiring</label>
              <select
                name="urgentHiring"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.urgentHiring}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {formik.errors.urgentHiring && (
                <div className="text-red-500 text-sm">
                  {formik.errors.urgentHiring}
                </div>
              )}
            </div>

            {/* Job Title */}
            <div className="mb-4">
              <label className="block text-gray-700">Job Title</label>
              <input
                name="title"
                type="text"
                placeholder="Enter job title"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.errors.title && (
                <div className="text-red-500 text-sm">
                  {formik.errors.title}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="mb-4">
              <label className="block text-gray-700">Job Details</label>
              <textarea
                name="details"
                placeholder="Enter job details"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.details}
              />
              {formik.errors.details && (
                <div className="text-red-500 text-sm">
                  {formik.errors.details}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 1 && (
          <>
            {/* Skills */}
            <div className="mb-4">
              <label className="block text-gray-700">Skills</label>
              <textarea
                name="skills"
                placeholder="Enter skills seperated by comma (e.g. HTML, CSS, JavaScript)"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.skills}
              />
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <label className="block text-gray-700">Benifits</label>
              <textarea
                name="benefits"
                placeholder="Enter benefits seperated by new line"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.benefits}
              />
            </div>

            {/* Qualifications */}
            <div className="mb-4">
              <label className="block text-gray-700">Qualifications</label>
              <textarea
                name="qualifications"
                placeholder="Enter qualifications seperated by new line"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.qualifications}
              />
            </div>

            {/* Responsibilities */}
            <div className="mb-4">
              <label className="block text-gray-700">Responsibilities</label>
              <textarea
                name="responsibilities"
                placeholder="Enter responsibilities seperated by new line"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.responsibilities}
              />
            </div>

            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* Experience */}
            <div className="mb-4">
              <label className="block text-gray-700">Experience</label>
              <input
                name="experience"
                type="text"
                placeholder="Enter experience in year (1, 2)"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.experience}
              />
              {formik.errors.experience && (
                <div className="text-red-500 text-sm">
                  {formik.errors.experience}
                </div>
              )}
            </div>

            {/* Salary */}
            <div className="mb-4">
              <label className="block text-gray-700">Salary</label>
              <input
                name="salary"
                type="text"
                placeholder="Enter salary (45000-50000)"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.salary}
              />
              {formik.errors.salary && (
                <div className="text-red-500 text-sm">
                  {formik.errors.salary}
                </div>
              )}
            </div>

            {/* Job Type */}
            <div className="mb-4">
              <label className="block text-gray-700">Job Type</label>
              <input
                name="jobType"
                type="text"
                placeholder="Enter job type (Full-time, Part-time)"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.jobType}
              />
              {formik.errors.jobType && (
                <div className="text-red-500 text-sm">
                  {formik.errors.jobType}
                </div>
              )}
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                name="location"
                type="text"
                placeholder="Enter location (e.g. New Delhi, USA)"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.location}
              />
              {formik.errors.location && (
                <div className="text-red-500 text-sm">
                  {formik.errors.location}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 3 && (
          <>
            {/* Number Of Opening */}
            <div className="mb-4">
              <label className="block text-gray-700">Number Of Opening</label>
              <input
                name="numberOfOpening"
                type="text"
                placeholder="Enter number Of Opening (1, 2)"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.numberOfOpening}
              />
              {formik.errors.numberOfOpening && (
                <div className="text-red-500 text-sm">
                  {formik.errors.numberOfOpening}
                </div>
              )}
            </div>

            {/* Respond Time */}
            <div className="mb-4">
              <label className="block text-gray-700">Respond Time</label>
              <input
                name="respondTime"
                type="text"
                placeholder="Enter respond time (e.g. 1 day, 2 days)"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.respondTime}
              />
              {formik.errors.respondTime && (
                <div className="text-red-500 text-sm">
                  {formik.errors.respondTime}
                </div>
              )}
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block text-gray-700">Duration</label>
              <input
                name="duration"
                type="text"
                placeholder="Enter duration (e.g. Monday to Friday)"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.duration}
              />
              {formik.errors.duration && (
                <div className="text-red-500 text-sm">
                  {formik.errors.duration}
                </div>
              )}
            </div>

            {/* Job Validity In Days */}
            <div className="mb-4">
              <label className="block text-gray-700">
                Job Validity In Days
              </label>
              <input
                name="jobValidityInDays"
                type="text"
                placeholder="Enter job validity in days (e.g. 15, 30)"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                value={formik.values.jobValidityInDays}
              />
              {formik.errors.jobValidityInDays && (
                <div className="text-red-500 text-sm">
                  {formik.errors.jobValidityInDays}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-bold mb-4">Review & Submit</h2>
            <pre className="p-4 bg-gray-100 rounded">
              {JSON.stringify(formik.values, null, 2)}
            </pre>
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Previous
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default JobForm;
