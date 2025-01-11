import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Your action to fetch user data (assuming you have one)
import { fetchUserData } from '../../actions/userActions';

const CompanyDetails = () => {
  // Accessing user data from the Redux store with fallback for undefined state
  const { user, loading, error } = useSelector((state) => state?.user || {});

  const dispatch = useDispatch();

  // Check if the user is fetched, if not, fetch it
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData()); // Assuming this action will fetch the user data
    }
  }, [dispatch, user]);

  // Show loading state if user data is not yet available
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error if something went wrong while fetching data
  if (error) {
    return <div>Error fetching user data</div>;
  }

  // Destructure company details if user exists
  const { companyName, website, industry, email, phone, CINNumber, businessFile } = user?.companyDetails || {};

  // Handle form changes
  const handleInputChange = (e) => {
    // Handle input changes here (e.g., form updates or validations)
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., update company details in Redux or backend)
  };

  return (
    <div className="container">
      <h1>Company Details</h1>
      {/* Form for company details */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={companyName || ''}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={website || ''}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={industry || ''}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email || ''}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone || ''}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="CINNumber">CIN Number</label>
          <input
            type="text"
            id="CINNumber"
            name="CINNumber"
            value={CINNumber || ''}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="businessFile">Business File</label>
          <input
            type="file"
            id="businessFile"
            name="businessFile"
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default CompanyDetails;
