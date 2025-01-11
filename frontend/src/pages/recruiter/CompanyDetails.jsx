import React, { useState } from "react";
import { useSelector } from "react-redux";

const CompanyDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(company);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCompany(formData);
    setIsEditing(false);
    alert("Company details updated successfully!");
  };

  const handleDeleteCompany = () => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      setCompany(null);
      alert("Company deleted successfully!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 border border-gray-300">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Company Details
      </h1>

      {!isEditing ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="info-card">
              <p className="text-sm text-gray-500 font-medium">Company Name</p>
              <p className="text-xl text-gray-800 font-semibold">
                {company.companyName}
              </p>
            </div>
            <div className="info-card">
              <p className="text-sm text-gray-500 font-medium">Website</p>
              <a
                href={company.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-xl font-semibold"
              >
                {company.companyWebsite}
              </a>
            </div>
            <div className="info-card">
              <p className="text-sm text-gray-500 font-medium">Industry</p>
              <p className="text-xl text-gray-800 font-semibold">
                {company.industry}
              </p>
            </div>
            <div className="info-card">
              <p className="text-sm text-gray-500 font-medium">Email</p>
              <p className="text-xl text-gray-800 font-semibold">
                {company.email}
              </p>
            </div>
            <div className="info-card">
              <p className="text-sm text-gray-500 font-medium">Admin Email</p>
              <p className="text-xl text-gray-800 font-semibold">
                {company.adminEmail}
              </p>
            </div>
            <div className="info-card">
              <p className="text-sm text-gray-500 font-medium">Phone</p>
              <p className="text-xl text-gray-800 font-semibold">
                {company.phone}
              </p>
            </div>
            <div className="info-card">
              <p className="text-sm text-gray-500 font-medium">CIN Number</p>
              <p className="text-xl text-gray-800 font-semibold">
                {company.CIN}
              </p>
            </div>
            <div className="info-card">
              <p className="text-sm text-gray-500 font-medium">Business File</p>
              <a
                href={company.businessFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-xl font-semibold"
              >
                View Business File
              </a>
            </div>
          </div>

          <div className="flex justify-end space-x-6 mt-8">
            {user.emailId.email === company.adminEmail && (
              <button
                onClick={toggleEdit}
                className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Edit Company Details
              </button>
            )}
            <button
              onClick={handleDeleteCompany}
              className="px-6 py-3 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
            >
              Delete Company
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="input-card">
              <label className="text-sm text-gray-600 font-medium">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="input-card">
              <label className="text-sm text-gray-600 font-medium">
                Website
              </label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="input-card">
              <label className="text-sm text-gray-600 font-medium">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="input-card">
              <label className="text-sm text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="input-card">
              <label className="text-sm text-gray-600 font-medium">
                Admin Email
              </label>
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="input-card">
              <label className="text-sm text-gray-600 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="input-card">
              <label className="text-sm text-gray-600 font-medium">
                CIN Number
              </label>
              <input
                type="text"
                name="taxId"
                value={formData.CIN}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-6 mt-8">
            <button
              type="submit"
              className="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
            >
              Save Changes
            </button>
            <button
              onClick={toggleEdit}
              className="px-6 py-3 text-white bg-gray-600 rounded-md hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CompanyDetails;
