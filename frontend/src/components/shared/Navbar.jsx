import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, isRecruiter, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPolicyHovered, setIsPolicyHovered] = useState(false);

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close the sidebar after navigation
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
            <li>
              <Link to="/browse" className="hover:text-blue-700">
                Browse
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
                <Link to="/signup">
                  <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                    Signup
                  </button>
                </Link>
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
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
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
            <li>
              <Link to="/browse" onClick={() => setIsMenuOpen(false)}>
                Browse
              </Link>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("policies")}>
                Policies
              </button>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="px-4 mt-6">
            <Link to="/login">
              <button className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 mb-2">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                Signup
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
