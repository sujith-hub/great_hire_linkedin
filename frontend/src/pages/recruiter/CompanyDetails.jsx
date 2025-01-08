import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CompanyDetails = () => {
  const { id } = useParams(); // Assuming company id is passed via URL params
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        // Mock data to simulate API response
        const mockCompanyData = {
          name: "Tech Swim",
          website: "https://www.techswim.com",
          industry: "Product Based",
          location: "RIICO Industury, Tapukara, Rajasthan, India, 301707",
          description:
            "Tech Swim is a leading company in the product-based industry, delivering innovative solutions for businesses worldwide.",
          email: "virsingh8938@gmail.com",
          adminEmail: "kcribca28134@gmail.com",
          phone: "8599446788",
          taxId: "123456789",
          businessFile:
            "https://res.cloudinary.com/ddj21a6aq/image/upload/v1735903135/nlh7er4o...",
        };

        setCompany(mockCompanyData);
      } catch (err) {
        setError("Failed to load company details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  const handleEditClick = () => {
    navigate(`/recruiter/dashboard/create-company?id=${id}`);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (!confirmDelete) return;

    try {
      // Simulate API call
      await axios.delete(`/api/companies/${id}`); // Replace with your actual API endpoint
      alert("Company deleted successfully!");
      navigate("/recruiter/dashboard"); // Redirect to dashboard or another page
    } catch (err) {
      console.error("Error deleting company:", err);
      alert("Failed to delete company. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading company details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!company) {
    return <div className="text-center text-xl text-gray-500">No company data found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg mt-12">
      <h1 className="text-4xl font-semibold text-blue-600 text-center mb-8 mt-0">Company Profile</h1>

      <div className="flex flex-col md:flex-row gap-8 mb-12 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">{company.name}</h2>
          <p className="text-lg text-gray-600">{company.description}</p>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-800">
              <span className="font-semibold">Industry:</span>
              <span>{company.industry}</span>
            </div>
            <div className="flex justify-between items-center text-gray-800">
              <span className="font-semibold">Location:</span>
              <span>{company.location}</span>
            </div>
            <div className="flex justify-between items-center text-gray-800">
              <span className="font-semibold">Website:</span>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-indigo-500"
              >
                {company.website}
              </a>
            </div>
            <div className="flex justify-between items-center text-gray-800">
              <span className="font-semibold">Email:</span>
              <span>{company.email}</span>
            </div>
            <div className="flex justify-between items-center text-gray-800">
              <span className="font-semibold">Admin Email:</span>
              <span>{company.adminEmail}</span>
            </div>
            <div className="flex justify-between items-center text-gray-800">
              <span className="font-semibold">Phone:</span>
              <span>{company.phone}</span>
            </div>
            <div className="flex justify-between items-center text-gray-800">
              <span className="font-semibold">CIN Number:</span>
              <span>{company.taxId}</span>
            </div>
            <div className="flex justify-between items-center text-gray-800">
              <span className="font-semibold">Business File:</span>
              <a
                href={company.businessFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-indigo-500"
              >
                View Business File
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleEditClick}
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-500 transition duration-300 ease-in-out"
        >
          Edit Company Details
        </button>
        <button
          onClick={handleDeleteClick}
          className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300 ease-in-out"
        >
          Delete Company
        </button>
      </div>
    </div>
  );
};

export default CompanyDetails;
