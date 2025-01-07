import React, { useState } from 'react';

function RecruiterPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    alert(`You selected the ${plan} plan.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-center mb-16">Choose Your Subscription Plan</h1>

      <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
          {/* Silver Plan */}
          <div
            className="bg-white shadow-lg rounded-3xl p-6 w-full md:w-1/3 transform hover:scale-110 transition duration-300"
            onClick={() => handleSelectPlan('Silver')}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Silver Plan</h2>
            <p className="text-lg text-blue-500 font-bold mb-4">₹199/month</p>
            <ul className="space-y-2 text-gray-600">
              <li>Content</li>
              <li>Content</li>
              <li>Content</li>
            </ul>
            <button className="mt-6 w-full py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
              Choose Plan
            </button>
          </div>

          {/* Gold Plan */}
          <div
            className="bg-white shadow-lg rounded-3xl p-6 w-full md:w-1/3 transform hover:scale-110 transition duration-300"
            onClick={() => handleSelectPlan('Gold')}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Gold Plan</h2>
            <p className="text-lg text-yellow-500 font-bold mb-4">₹299/month</p>
            <ul className="space-y-2 text-gray-600">
              <li>Content</li>
              <li>Content</li>
              <li>Content</li>
            </ul>
            <button className="mt-6 w-full py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600">
              Choose Plan
            </button>
          </div>

          {/* Platinum Plan */}
          <div
            className="bg-white shadow-lg rounded-3xl p-6 w-full md:w-1/3 transform hover:scale-110 transition duration-300"
            onClick={() => handleSelectPlan('Platinum')}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Platinum Plan</h2>
            <p className="text-lg text-purple-500 font-bold mb-4">₹399/month</p>
            <ul className="space-y-2 text-gray-600">
              <li>Content</li>
              <li>Content</li>
              <li>Content</li>
            </ul>
            <button className="mt-6 w-full py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterPlans;
