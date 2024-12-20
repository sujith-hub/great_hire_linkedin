import React, { useEffect, useState } from "react";
import img6 from "../../assets/img6.png";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostJobForm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user)
  useEffect(()=>{
    if(!user || user && user.role !== 'recruiter'){
      navigate('/login')
    }
  },[])
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    applicationMethod: "",
    benefits: "",
    experience: "",
    education: "",
    skills: "",
    openings: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col-reverse md:flex-row-reverse  justify-between items-center bg-gray-100">
        {/* Left Side - Form */}
        <div className="flex flex-col space-y-3 w-full md:w-1/2 p-6 lg:p-16 bg-gradient-to-r from-gray-100 to-white">
          <h1 className="text-3xl font-bold text-center">
            Great<span className="text-blue-700">Hire</span>
          </h1>
          <h2 className="text-3xl font-bold mb-6 text-gray-700">Post a Job</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">Job Type</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Select</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Salary Range</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  name="salaryMin"
                  placeholder="Min"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
                <input
                  type="number"
                  name="salaryMax"
                  placeholder="Max"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">
                  Number of Openings
                </label>
                <input
                  type="number"
                  name="openings"
                  value={formData.openings}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  min="1"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition"
            >
              Post Job
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className=" hidden md:block w-1/2 h-full">
          <img src={img6} alt="" className=" h-full object-cover  opacity-80" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostJobForm;
