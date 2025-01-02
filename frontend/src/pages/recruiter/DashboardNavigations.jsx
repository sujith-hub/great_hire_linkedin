import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNavigations = () => {

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100 text-gray-700"}`;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-52 bg-gray-100 p-4 justify-between fixed top-16 overflow-y-auto shadow-md">
      {/* Main Navigation Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Dashboard</h2>
        <ul className="flex flex-col gap-4">
          <NavLink to="/recruiter/dashboard/home" className={navLinkClass}>
            Home
          </NavLink>
          <li className="relative group">
            <span className="block px-4 py-2 cursor-pointer rounded-lg text-gray-700 hover:bg-blue-100">
              Create New
            </span>
            <ul className="absolute  left-5 hidden group-hover:block bg-gray-50 shadow-lg rounded-lg py-2 w-full">
              <NavLink to="/recruiter/dashboard/create-company" className={navLinkClass}>
                Company
              </NavLink>
              <NavLink to="/recruiter/dashboard/add-recruiter" className={navLinkClass}>
                Add Recruiter
              </NavLink>
              <NavLink to="/recruiter/dashboard/post-job" className={navLinkClass}>
                Post Job
              </NavLink>
            </ul>
          </li>
          <NavLink to="/recruiter/dashboard/jobs" className={navLinkClass}>
            Jobs
          </NavLink>
          <NavLink to="/recruiter/dashboard/company-details" className={navLinkClass}>
            Company Details
          </NavLink>
        </ul>
      </section>

      {/* Footer Navigation Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Settings</h2>
        <ul className="flex flex-col gap-4">
          <NavLink to="/recruiter/dashboard/your-plans" className={navLinkClass}>
            Your Plans
          </NavLink>
          <NavLink to="/recruiter/dashboard/delete-account" className={navLinkClass}>
            Delete Account
          </NavLink>
        </ul>
      </section>
    </div>
  );
};

export default DashboardNavigations;
