import React, { useState } from 'react';

const DeleteAccount = () => {
  const [selectedEmail, setSelectedEmail] = useState('');
  const recruiters = [
    'recruiter1@example.com',
    'recruiter2@example.com',
    'recruiter3@example.com',
  ];

  const handleMakeAdmin = () => {
    if (selectedEmail) {
      alert(`${selectedEmail} has been promoted to admin!`);
      // Add logic for promoting the user to admin
    } else {
      alert('Please select a recruiter to promote.');
    }
  };

  const handleDelete = () => {
    if (selectedEmail) {
      alert('Account deleted successfully! Ensure the new admin is assigned.');
      // Add logic for account deletion
    } else {
      alert('Please assign a new admin before deleting your account.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Delete Account
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Before leaving, assign a recruiter as the new admin to ensure smooth
          operations.
        </p>

        {/* Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="recruiter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select a Recruiter
          </label>
          <select
            id="recruiter"
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose a recruiter</option>
            {recruiters.map((email, index) => (
              <option key={index} value={email}>
                {email}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleMakeAdmin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Promote to Admin
          </button>
          <button
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;

