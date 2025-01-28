import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const CurrentPlans = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { company, currentPlan } = useSelector((state) => state.company);
  const { jobPlan } = useSelector((state) => state.jobPlan);

  if (!user || !company) return <p>Loading...</p>;

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 text-center">
          <AiFillSafetyCertificate className="mx-auto text-5xl mb-3 text-green-400" />
          <h1 className="text-3xl font-bold">Your Current Plan</h1>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              {currentPlan?.name || "Free Plan"}
            </h2>
            <p className="text-gray-600 mb-4">
              {currentPlan?.description ||
                "Access basic features at no cost. Perfect for getting started."}
            </p>

            <div className="space-y-3">
              {currentPlan?.features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white p-3 rounded-lg shadow-sm"
                >
                  <span className="text-green-500 mr-3">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {user?.emailId.email === company?.adminEmail && !jobPlan && (
            <div className="text-center">
              <Button
                onClick={() => navigate("/recruiter/dashboard/upgrade-plans")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-lg"
              >
                Upgrade Plans
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentPlans;
