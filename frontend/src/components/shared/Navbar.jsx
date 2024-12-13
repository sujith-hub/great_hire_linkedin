import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle navigation to a specific section
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
            <li>
              <button
                className="hover:text-blue-700 transition duration-200"
                onClick={() => handleScrollToSection("home")}
              >
                <Link to="/">Home</Link>
              </button>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-blue-700 transition duration-200">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/browse" className="hover:text-blue-700 transition duration-200">
                Browse
              </Link>
            </li>
            <li>
              <button
                className="hover:text-blue-700 transition duration-200"
                onClick={() => handleScrollToSection("policies")}
              >
                Policies
              </button>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-700 transition duration-200">
                Contact us
              </Link>
            </li>
          </ul>
          {/* Login and Signup Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/login">
              <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                Signup
              </button>
            </Link>
          </div>
        </div>

        {/* Hamburger Icon for Small Devices */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
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
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 lg:hidden`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h1 className="text-xl font-bold">
            Great<span className="text-blue-700">Hire</span>
          </h1>
          <button
            className="text-gray-700 focus:outline-none"
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

        <ul className="flex flex-col font-medium mt-4">
          <li
            className="px-4 py-2 hover:bg-gray-100"
            onClick={() => handleScrollToSection("home")}
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/jobs" onClick={() => setIsMenuOpen(false)}>
              Jobs
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/browse" onClick={() => setIsMenuOpen(false)}>
              Browse
            </Link>
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleScrollToSection("policies")}
          >
            <Link to="/policies" onClick={() => setIsMenuOpen(false)}>
              Policies
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact us
            </Link>
          </li>
        </ul>

        {/* Login and Signup Buttons in Sidebar */}
        <div className="px-4 mt-6">
          <Link to="/login">
            <button className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 mb-4">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
