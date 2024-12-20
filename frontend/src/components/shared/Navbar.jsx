import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/redux/authSlice";
import {toast} from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const isRecruiter = user?.role?.includes("recruiter");;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPolicyMenuOpen, setIsPolicyMenuOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Refs for click outside detection
  const mobileMenuRef = useRef(null);
  const policyMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle click outside for menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (policyMenuRef.current && !policyMenuRef.current.contains(event.target)) {
        setIsPolicyMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleSignupOption = (type) => {
    navigate(type === "job" ? "/signup" : "/recruiter/signup");
    setIsSignupModalOpen(false);
    setIsMenuOpen(false);
  };

  const navLinks = [
    ...(isRecruiter
      ? [
          { to: "/recruiter/dashboard", label: "Dashboard" },
          { to: "/your-jobs", label: "Your Jobs" },
        ]
      : [{ to: "/", label: "Home" }]),
    { to: "/jobs", label: "Jobs" },
    { to: "/great-hire/services", label: "Our Services" },
    { to: "/contact", label: "Contact Us" },
  ];

  const policyLinks = [
    { to: "/policy/privacy-policy", label: "Privacy Policy" },
    { to: "/policy/refund-policy", label: "Refund and Return Policy" },
    { to: "/policy/terms-and-conditions", label: "Terms and Conditions" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-30">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold relative z-30">
            Great<span className="text-blue-700">Hire</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-12">
            <ul className="flex font-medium items-center gap-5">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="hover:text-blue-700 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              
              {/* Policy Menu */}
              <li ref={policyMenuRef} className="relative">
                <button
                  onClick={() => setIsPolicyMenuOpen(!isPolicyMenuOpen)}
                  className="hover:text-blue-700 transition-colors flex items-center gap-1"
                  aria-expanded={isPolicyMenuOpen}
                  aria-haspopup="true"
                >
                  Policies
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isPolicyMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isPolicyMenuOpen && (
                  <div className="absolute left-0 mt-2 w-60 bg-white rounded-xl shadow-lg border p-1 z-20">
                    {policyLinks.map(({ to, label }) => (
                      <Link
                        key={to}
                        to={to}
                        className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsPolicyMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            {/* Desktop User Section */}
            <div className="flex items-center gap-4">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Login
                  </Link>
                  <button
                    onClick={() => setIsSignupModalOpen(true)}
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Signup
                  </button>
                </>
              ) : (
                <div ref={profileMenuRef} className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="true"
                  >
                    <img
                      src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                      alt={`${user.fullname || "User"}'s avatar`}
                      className="h-10 w-10 rounded-full border object-cover"
                    />
                    <span className="font-medium">{user.fullname || "User"}</span>
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border p-1 z-20">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Mobile Menu Panel */}
          <div
            ref={mobileMenuRef}
            className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile User Section */}
            <div className="p-4 border-b">
              {user ? (
                <div className="flex items-center gap-3">
                  <img
                    src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                    alt="Profile"
                    className="h-12 w-12 rounded-full border object-cover"
                  />
                  <div>
                    <p className="font-medium">{user.fullname || "User"}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <button
                    onClick={() => {
                      setIsSignupModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <div className="py-4">
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Navigation</p>
              </div>
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="block px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {/* Mobile Policy Section */}
              <div className="mt-4 border-t">
                <div className="px-4 py-2">
                  <p className="text-sm font-medium text-gray-500">Policies</p>
                </div>
                {policyLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="block px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Mobile User Actions */}
              {user && (
                <div className="mt-4 border-t">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-500">Account</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in fade-in duration-200">
            <h2 className="text-xl font-semibold mb-4">Join GreatHire</h2>
            <div className="space-y-3">
              <button
                onClick={() => handleSignupOption("job")}
                className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
              >
                I'm looking for a Job
              </button>
              <button
                onClick={() => handleSignupOption("recruiter")}
                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                I'm looking for Candidates
              </button>
              <button
                onClick={() => setIsSignupModalOpen(false)}
                className="w-full py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;

