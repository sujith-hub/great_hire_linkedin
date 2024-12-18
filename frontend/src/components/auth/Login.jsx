import React, { useState } from "react";
import img2 from "../../assets/img2.png";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../GoogleLogin";
import { google_client_id } from "../../utils/GoogleOAuthCredentials.js";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Update state when input fields change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          data: formData,
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        // Show success message
        toast.success(response.data.message);
        setFormData({
          email: "",
          password: "",
        });
        const userRole = response.data.user.role;
        if (userRole.includes("student")) navigate("/");
        else if (userRole.includes("recruiter")) navigate("/post-job");
        else if (userRole.includes("admin")) navigate("/admin/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(`error in login ${err}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 lg:w-1/3 flex items-center justify-center bg-gradient-to-l from-white to-blue-100 p-6">
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center">
              Great<span className="text-blue-700">Hire</span>
            </h1>
            <h1 className="text-2xl md:text-4xl font-bold text-center">
              Login
            </h1>
            <p className="text-sm md:text-md font-semibold text-gray-500 text-center">
              Find the job made for you!
            </p>
            {/* Google Login Button */}
            <GoogleOAuthProvider clientId={google_client_id}>
              <GoogleLogin text="Login" role="student" />
            </GoogleOAuthProvider>
            <p className="text-sm font-semibold text-gray-400 text-center">
              ---- or Login with email ----
            </p>
            <div className="flex flex-col space-y-4">
              <label className="font-bold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="mail@domain.com"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <label className="font-bold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-500">
              New at GreatHire?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Signup
              </a>
            </p>
          </form>
        </div>

        {/* Right Section - Background Image */}
        <div className="relative w-full md:w-1/2 lg:w-2/3 h-1/2 md:h-full">
          <img
            src={img2}
            alt="Background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 p-4 z-10">
            <h1 className="font-bold text-3xl md:text-4xl text-gray-600">
              Find the job made for you.
            </h1>
            <p className="font-medium text-gray-600 text-sm md:text-lg max-w-[90%] md:max-w-[70%]">
              Browse over 150K jobs at top companies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
