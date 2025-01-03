import React from "react";
import { NavLink } from "react-router-dom";
import { RiHome4Line } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import { PiBuildingOffice } from "react-icons/pi";
import { BiDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { BsPersonPlus } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";


const DashboardNavigations = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg w-full ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100 text-gray-700"
    }`;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-52 bg-gray-100 p-4 justify-between fixed top-16 overflow-y-auto shadow-md ">
      {/* Main Navigation Section */}
      <section>
        <h2 className="flex gap-2 items-center text-lg font-semibold text-gray-700 mb-4">
          <LuLayoutDashboard size={25} /> <span>Dashboard</span>
        </h2>
        <ul className="w-full flex flex-col gap-4">
          <NavLink to="/recruiter/dashboard/home" className={navLinkClass}>
            <RiHome4Line size={25} />
            <span>Home</span>
          </NavLink>
          <li className="relative group">
            <span className="flex gap-2 px-4 py-2 cursor-pointer rounded-lg text-gray-700 hover:bg-blue-100">
              <IoCreateOutline size={25} />
              <span>Create New</span>
            </span>
            <ul className="absolute  left-5 hidden group-hover:block bg-gray-50 shadow-lg rounded-lg py-2 w-full">
              <NavLink
                to="/recruiter/dashboard/create-company"
                className={navLinkClass}
              >
                <PiBuildingOfficeLight size={25} />
                <span>Company</span>
              </NavLink>
              <NavLink
                to="/recruiter/dashboard/add-recruiter"
                className={navLinkClass}
              >
                <BsPersonPlus size={25} />
                <span>Add Recruiter</span>
              </NavLink>
              <NavLink
                to="/recruiter/dashboard/post-job"
                className={navLinkClass}
              >
                <MdPostAdd size={25} />
                <span>Post Job</span>
              </NavLink>
            </ul>
          </li>
          <NavLink to="/recruiter/dashboard/jobs" className={navLinkClass}>
            <MdWorkOutline size={25} />
            <span>Jobs</span>
          </NavLink>
          <NavLink
            to="/recruiter/dashboard/company-details"
            className={navLinkClass}
          >
            <PiBuildingOffice size={25} />
            <span>Company Details</span>
          </NavLink>
        </ul>
      </section>

      {/* Footer Navigation Section */}
      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
          <IoSettingsOutline size={25} />
          <span>Settings</span>
        </h2>
        <ul className="flex flex-col gap-4">
          <NavLink
            to="/recruiter/dashboard/your-plans"
            className={navLinkClass}
          >
            <BiDetail size={25} />
            <span>Your Plans</span>
          </NavLink>
          <NavLink
            to="/recruiter/dashboard/delete-account"
            className={navLinkClass}
          >
            <RiDeleteBin6Line size={25} />
            <span>Delete Account</span>
          </NavLink>
        </ul>
      </section>
    </div>
  );
};

export default DashboardNavigations;
