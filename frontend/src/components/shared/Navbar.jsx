import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/redux/authSlice";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const isRecruiter = user?.role.includes("recruiter");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPolicyHovered, setIsPolicyHovered] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close the sidebar after navigation
    }
  };

  const handleJobButtonClick = () => {
    navigate("/signup"); // Redirect to login page
    setIsSignupModalOpen(false); // Close modal if open
  };

  const handleCandidateButtonClick = () => {
    navigate("/recruiter/signup"); // Redirect to recruiter signup
    setIsSignupModalOpen(false); // Close modal if open
  };

  const handleLogout = () => {
    if (user) {
      dispatch(logOut());
      toast.success("Logout Successfully!");
      navigate("/");
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 lg:px-0">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Great<span className="text-blue-700">Hire</span>
          </h1>
        </div>

        {/* Navbar Links for Large Devices */}
        <div className="hidden lg:flex lg:items-center lg:gap-12">
          <ul className="flex font-medium items-center gap-5">
            {isRecruiter ? (
              <>
                <li>
                  <Link
                    to="/recruiter/dashboard"
                    className="hover:text-blue-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/your-jobs" className="hover:text-blue-700">
                    Your Jobs
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/" className="hover:text-blue-700">
                  Home
                </Link>
              </li>
            )}
            <li>
              <Link to="/jobs" className="hover:text-blue-700">
                Jobs
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setIsPolicyHovered(true)}
              onMouseLeave={() => setIsPolicyHovered(false)}
            >
              <button className="hover:text-blue-700 transition duration-200">
                Policies
              </button>
              {isPolicyHovered && (
                <div className="absolute left-0 bg-white border animate-slide-in-right rounded-xl shadow-xl p-2 w-60 z-20">
                  <Link
                    to="/policy/privacy-policy"
                    className="px-4 py-2 hover:bg-gray-100 block"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/policy/refund-policy"
                    className="px-4 py-2 hover:bg-gray-100 block"
                  >
                    Refund and Return Policy
                  </Link>
                  <Link
                    to="/policy/terms-and-conditions"
                    className="px-4 py-2 hover:bg-gray-100 block"
                  >
                    Terms and Conditions
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link to="/great-hire/services" className="hover:text-blue-700">
                Our Services
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-blue-700">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login">
                  <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                    Login
                  </button>
                </Link>
                <button
                  onClick={() => setIsSignupModalOpen(true)}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                  Signup
                </button>
              </>
            ) : (
              <div className="relative">
                <button className="flex items-center gap-2">
                  <img
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full border"
                  />
                  <span>{user?.fullname || "User"}</span>
                </button>
                <div className="absolute bg-white shadow-lg rounded-lg mt-2 p-2 w-48">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Icon for Small Devices */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sliding Sidebar for Small Devices */}
      {isMenuOpen && (
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform ease-in-out duration-300`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <h1 className="text-xl font-bold">
              Great<span className="text-blue-700">Hire</span>
            </h1>
            <button
              className="text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="mt-4 px-4 space-y-2">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={() => setIsMenuOpen(false)}>
                Jobs
              </Link>
            </li>
            {/* Policies Dropdown for Mobile View */}
            <li className="relative">
              <button
                className="flex justify-between w-full items-center py-2 hover:text-blue-700"
                onClick={() => setIsPolicyHovered(!isPolicyHovered)}
              >
                Policies
                <svg
                  className={`w-5 h-5 transform ${
                    isPolicyHovered ? "rotate-180" : "rotate-0"
                  } transition-transform duration-200`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isPolicyHovered && (
                <div className="bg-white shadow-md rounded-lg border mt-2">
                  <ul className="flex flex-col">
                    <li>
                      <Link
                        to="/policy/privacy-policy"
                        className="px-4 py-2 hover:bg-gray-100 block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/policy/refund-policy"
                        className="px-4 py-2 hover:bg-gray-100 block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Refund and Return Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/policy/terms-and-conditions"
                        className="px-4 py-2 hover:bg-gray-100 block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Terms and Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Add Login and Signup Buttons */}
          <div className="px-4 mt-6">
            <Link to="/login">
              <button className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 mb-2">
                Login
              </button>
            </Link>
            <button
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
              onClick={handleJobButtonClick} // Direct to login on Job button click
            >
              I'm looking for a Job
            </button>

            <button className="w-full mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
              I'm looking for Candidates
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-semibold mb-4">Select an Option</h2>
            <button
              className="w-full bg-blue-700 text-white py-2 rounded-lg mb-2 hover:bg-blue-800"
              onClick={handleJobButtonClick} // Redirect to login when selecting job search
            >
              I'm looking for a Job
            </button>
            <button
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
              onClick={handleCandidateButtonClick} // Redirect to signup for recreuiter
            >
              I'm looking for Candidates
            </button>
            <button
              onClick={() => setIsSignupModalOpen(false)}
              className="w-full mt-2 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
