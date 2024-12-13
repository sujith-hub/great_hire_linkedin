import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/authSlice.js";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { User2, LogOut } from "lucide-react"; // Ensure lucide-react is installed

const Button = ({ children, className, variant = "default", ...props }) => (
  <button
    className={`px-4 py-2 text-white font-medium rounded ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Navbar = () => {
  const { user } = useSelector((store) => store.auth || {});
  const [isPolicyHovered, setIsPolicyHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const isRecruiter = user?.role === "recruiter";

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close the sidebar after navigation
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
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
                <li><Link to="/recruiter/dashboard" className="hover:text-blue-700">Dashboard</Link></li>
                <li><Link to="/" className="hover:text-blue-700">Your Jobs</Link></li>
                <li><Link to="/jobs" className="hover:text-blue-700">Search Jobs</Link></li>
                <li><Link to="/recruiter/post-job" className="hover:text-blue-700">Post Job</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className="hover:text-blue-700">Home</Link></li>
                <li><Link to="/jobs" className="hover:text-blue-700">Jobs</Link></li>
              </>
            )}

            <li
              className="relative"
              onMouseEnter={() => setIsPolicyHovered(true)}
              onMouseLeave={() => setIsPolicyHovered(false)}
            >
              <button
                className="font-medium hover:text-blue-700 transition duration-200"
                aria-haspopup="true"
                aria-expanded={isPolicyHovered}
              >
                Policies
              </button>
              {isPolicyHovered && (
                <div className="absolute left-0 bg-white border rounded-xl shadow-xl p-2 w-60 z-20">
                  <Link to="/policy/privacy-policy" className="px-4 py-2 hover:bg-gray-100 block">Privacy Policy</Link>
                  <Link to="/policy/refund-policy" className="px-4 py-2 hover:bg-gray-100 block">Refund and Return Policy</Link>
                  <Link to="/policy/terms-and-conditions" className="px-4 py-2 hover:bg-gray-100 block">Terms and Conditions</Link>
                </div>
              )}
            </li>

            <li><Link to="/contact" className="hover:text-blue-700">Contact us</Link></li>
          </ul>

          {/* Login and Signup Buttons */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button className="bg-blue-700 hover:bg-blue-800">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-700 hover:bg-blue-800">Signup</Button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer">
                    <Avatar className="h-10 w-10 border border-gray-200 rounded-full">
                      <AvatarImage
                        src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </Avatar>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-64 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 rounded-full">
                      <AvatarImage
                        src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                        alt="User Avatar"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-gray-800">{user?.fullname || "User"}</h4>
                      <p className="text-sm text-gray-600">{isRecruiter ? "Recruiter" : "Job Seeker"}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link to="/profile" className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg">
                      <User2 />
                      <span>View Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg w-full"
                    >
                      <LogOut />
                      <span>Logout</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
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
          <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleScrollToSection("home")}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/jobs" onClick={() => setIsMenuOpen(false)}>Jobs</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/browse" onClick={() => setIsMenuOpen(false)}>Browse</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleScrollToSection("policies")}>
            <Link to="/policies" onClick={() => setIsMenuOpen(false)}>Policies</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
            <Link to="/contact">Contact</Link>
          </li>
          {user ? (
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          ) : (
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
