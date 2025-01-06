import React, { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CollectUserDetails from "./CollectUserDetails";
import { jobPlans } from "../../utils/jobPlans.js";

const JobServicePlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <>
      <Navbar />
      {!selectedPlan ? (
        <div className="bg-gray-100 py-10">
          <h2 className="text-3xl font-bold text-center mb-2">
            Choose a plan that fits your needs
          </h2>
          <p className="text-md font-light text-center mb-8">
            Refund of up to 25% if application volume not met
          </p>
          <div className="px-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {jobPlans?.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-sm flex flex-col border-2 border-black ${
                    plan.isBestValue ? "border-2 border-blue-400" : ""
                  }`}
                >
                  <div className="flex flex-col justify-between items-center p-1">
                    <div className="text-center flex flex-col space-y-4 h-60">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {plan.isBestValue && (
                          <span className="text-sm font-semibold text-yellow-800 bg-yellow-300 py-1 px-3 rounded-full mb-4 self-center">
                            Best Value
                          </span>
                        )}
                        <br />
                        {plan.headline}
                      </h3>
                      <div>
                        <p className="text-lg font-bold text-blue-700">
                        ₹{plan.price}
                        </p>
                        {plan.duration && (
                          <p className="text-sm text-gray-500">
                            {plan.duration}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">
                        {plan.setupFee}
                      </span>

                      <p className="text-gray-500 text-sm mb-4">
                        {plan.subHeading}
                      </p>
                      {plan.validity && (
                        <p className="text-sm text-gray-500 mb-4">
                          {plan.validity}
                        </p>
                      )}
                    </div>
                    <div className="w-44 flex items-center justify-center mb-3">
                      <button
                        className="w-full py-3 px-4 font-bold text-indigo-600 border-2 border-gray-400 rounded hover:bg-indigo-100 transition"
                        onClick={() => setSelectedPlan(plan)}
                      >
                        Select
                      </button>
                    </div>
                  </div>

                  <div
                    className={`border-t-2 border-black p-2 ${
                      plan.isBestValue ? "border-t-2 border-blue-400" : ""
                    }`}
                  >
                    <ul className="flex flex-col gap-2">
                      {plan?.detailsList.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm text-gray-600"
                        >
                          <span className="text-blue-500 mr-2">✔</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <CollectUserDetails selectedPlan={selectedPlan} />
      )}
      <Footer />
    </>
  );
};

export default JobServicePlans;
