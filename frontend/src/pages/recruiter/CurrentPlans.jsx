import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const CurrentPlans = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="  p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Current Plan
        </h1>

        {/* Free Plan Details */}
        <div className="border-2 border-blue-700 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-green-600 flex items-center mb-4">
            <AiFillSafetyCertificate className="mr-2 text-green-500" />
            Free Plan
          </h2>
          <p className="text-gray-600">
            Enjoy access to our basic features at no cost. Upgrade anytime to
            unlock premium benefits.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-gray-700">
              10 free job post
            </li>
            <li className="flex items-center text-gray-700">Basic support</li>
          </ul>
        </div>

        {/* Upgrade Button */}
        {user?.emailId.email === company?.adminEmail &&
          company?.maxPostJobs && (
            <div className="text-center">
              <Button
                className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-800 transition duration-300"
                onClick={() => navigate("/recruiter/dashboard/upgrade-plans")}
              >
                Upgrade Plans
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default CurrentPlans;
