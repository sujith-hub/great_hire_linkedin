import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Navbar from "@/components/shared/Navbar";
import { RECRUITER_API_END_POINT } from "@/utils/ApiEndPoint";
import { useSelector } from "react-redux";

const AddRecruiter = () => {
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", // Changed from fullname to fullName
    email: "",
    phoneNumber: "",
    position: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${RECRUITER_API_END_POINT}/add-recruiter`,
        {
          ...formData,
          userEmail: user?.email,
          companyId: company?._id,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message);

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        position: "",
        password: "",
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-4 flex items-center justify-center bg-gradient-to-r">
        <form className="w-1/3 space-y-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-blue-600">
            {company.companyName}
          </h1>
          <h1 className="text-3xl font-bold text-center">
            Give Recruiter Details
          </h1>
          <h1 className="text-md font-semibold text-gray-500 text-center">
            Build your smart and powerful recruiter team
          </h1>
          <div className="flex flex-col space-y-2">
            <label className="font-bold">Full Name</label>
            <input
              type="text"
              name="fullName" // Updated name
              placeholder="Full Name"
              value={formData.fullName} // Updated value
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <label className="font-bold">Work Email</label>
            <input
              type="email"
              name="email"
              placeholder="mail@domain.com"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <label className="font-bold">Mobile Number</label>
            <input
              type="text"
              name="phoneNumber" // Updated name
              placeholder="Contact number"
              value={formData.phoneNumber} // Updated value
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <label className="font-bold">Position In Company</label>
            <input
              type="text"
              name="position"
              placeholder="Hiring manager, consultant ..."
              value={formData.position}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <label className="font-bold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="min 8 characters"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Recruiter"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRecruiter;
