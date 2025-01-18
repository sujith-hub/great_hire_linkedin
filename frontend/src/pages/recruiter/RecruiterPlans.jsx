import React, { useState } from 'react';
import { Check, Shield, Rocket, Diamond, Star } from 'lucide-react';

function RecruiterPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: 'Basic',
      icon: Shield,
      price: '₹499',
      color: 'blue',
      features: [
        'Up to 10 active job posts',
        'Basic candidate matching',
        'Email & chat support',
        'Basic analytics'
      ],
      popular: false
    },
    {
      name: 'Standard',
      icon: Rocket,
      price: '₹999',
      color: 'indigo',
      features: [
        'Up to 25 active job posts',
        'Advanced AI matching',
        'Priority 24/7 support',
        'Advanced analytics suite'
      ],
      popular: true
    },
    {
      name: 'Premium',
      icon: Diamond,
      price: '₹1,499',
      color: 'purple',
      features: [
        'Unlimited job posts',
        'Custom AI solutions',
        'Dedicated success manager',
        'Custom API integration'
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    console.log(`Selected ${plan.name} plan`);
  };

  const getButtonClasses = (color, popular) => {
    const baseClasses =
      'mt-4 w-full py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-98';
    const colorStyles = {
      blue: popular
        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
        : 'bg-blue-50 text-blue-600 hover:bg-blue-100',
      indigo: popular
        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white'
        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
      purple: popular
        ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
        : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
    };
    return `${baseClasses} ${colorStyles[color]}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Select Your Recruitment Solution
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Scale your hiring process with our industry-leading platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl p-6 transition-all duration-300 ${
                  plan.popular
                    ? 'shadow-xl ring-2 ring-indigo-500 hover:shadow-2xl'
                    : 'shadow-lg hover:shadow-xl'
                } ${plan.name === 'Basic' || plan.name === 'Premium' ? 'border-2 border-gray-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-md">
                    MOST POPULAR
                  </div>
                )}

                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h2>
                    <p className="text-2xl font-bold text-gray-900">
                      {plan.price}
                      <span className="text-sm font-normal text-gray-500 ml-1">/mo</span>
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-xl bg-${plan.color}-50`}>
                    <Icon className={`h-6 w-6 text-${plan.color}-500`} />
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className={`p-0.5 rounded-full bg-${plan.color}-50 mt-0.5`}>
                        <Check className={`h-3.5 w-3.5 text-${plan.color}-500`} />
                      </div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={getButtonClasses(plan.color, plan.popular)}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-2 shadow-sm">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-600">
              Trusted by 10,000+ recruitment teams worldwide
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterPlans;
