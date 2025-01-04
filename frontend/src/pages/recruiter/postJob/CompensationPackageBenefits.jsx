import React, { useState } from "react";

function CompensationPackageBenefits() {
  const compensationButtons = [
    "Yearly pay",
    "1099 contract",
    "RSU",
    "Stock options",
    "Bonus opportunities",
    "Signing bonus",
    "Performance bonus",
    "Retention bonus",
    "Monthly bonus",
    "Quarterly bonus",
    "Semiannual bonus",
    "Yearly bonus",
    "Employee stock purchase plan",
    "Employee stock ownership plan",
    "Profit sharing",
    "Hourly pay",
    "Weekly pay",
    "Commission pay",
    "Differential pay",
    "Double time pay",
    "Overtime pay",
    "Other",
  ];

  const benefitsButtons = [
    "Health insurance",
    "Paid time off",
    "Dental insurance",
    "401(k)",
    "Vision insurance",
    "Flexible schedule",
    "Tuition reimbursement",
    "Life insurance",
    "401(k) matching",
    "Retirement plan",
    "Referral program",
    "Employee discount",
    "Flexible spending account",
    "Health savings account",
    "Relocation assistance",
    "Parental leave",
    "Professional development assistance",
    "Employee assistance program",
    "Other",
  ];

  const [selectedCompensation, setSelectedCompensation] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [showAllCompensation, setShowAllCompensation] = useState(false);
  const [showAllBenefits, setShowAllBenefits] = useState(false);

  const handleButtonClick = (button, type) => {
    if (type === "compensation") {
      if (selectedCompensation.includes(button)) {
        setSelectedCompensation((prev) =>
          prev.filter((item) => item !== button)
        );
      } else {
        setSelectedCompensation((prev) => [...prev, button]);
      }
    } else if (type === "benefits") {
      if (selectedBenefits.includes(button)) {
        setSelectedBenefits((prev) => prev.filter((item) => item !== button));
      } else {
        setSelectedBenefits((prev) => [...prev, button]);
      }
    }
  };

  return (
    <div className="p-6">
      {/* Compensation Section */}
      <div className="mb-6">
        <h6 className="text-sm font-bold mb-4">Compensation Packages</h6>
        <div className="flex flex-wrap gap-3">
          {compensationButtons
            .slice(0, showAllCompensation ? compensationButtons.length : 9) // Show limited items unless expanded
            .map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button, "compensation")}
                className={`px-4 py-2 rounded-lg border ${
                  selectedCompensation.includes(button)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <span
                  className={`font-bold ${
                    selectedCompensation.includes(button)
                      ? "text-lg"
                      : "text-xl text-gray-700"
                  }`}
                >
                  {selectedCompensation.includes(button) ? "✔" : "+"}
                </span>
                {button}
              </button>
            ))}
        </div>
        <button
          onClick={() => setShowAllCompensation((prev) => !prev)}
          className="mt-4 text-blue-500 underline"
        >
          {showAllCompensation ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* Benefits Section */}
      <div>
        <h6 className="text-sm font-bold mb-4">Benefits</h6>
        <div className="flex flex-wrap gap-3">
          {benefitsButtons
            .slice(0, showAllBenefits ? benefitsButtons.length : 9) // Show limited items unless expanded
            .map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button, "benefits")}
                className={`px-4 py-2 rounded-lg border ${
                  selectedBenefits.includes(button)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <span
                  className={`font-bold ${
                    selectedBenefits.includes(button)
                      ? "text-lg"
                      : "text-xl text-gray-700"
                  }`}
                >
                  {selectedBenefits.includes(button) ? "✔" : "+"}
                </span>
                {button}
              </button>
            ))}
        </div>
        <button
          onClick={() => setShowAllBenefits((prev) => !prev)}
          className="mt-4 text-blue-500 underline"
        >
          {showAllBenefits ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default CompensationPackageBenefits;
