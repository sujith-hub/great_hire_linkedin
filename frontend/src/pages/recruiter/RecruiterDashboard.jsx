import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { COMPANY_API_END_POINT } from '@/utils/ApiEndPoint';
import axios from 'axios';
import { addCompany } from '@/redux/companySlice';

const RecruiterDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyByUserId = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${COMPANY_API_END_POINT}/company-by-userid`,
          { userId: user?._id },
          { withCredentials: true }
        );

        if (response.data.success) {
          dispatch(addCompany(response.data.company));
        }
      } catch (err) {
        console.error(`Error fetching company by user: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    if (user?.isVerify === 1) {
      fetchCompanyByUserId();
    }
  }, [user, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-4">
        {loading ? (
          <p>Loading...</p>
        ) : user?.isVerify === 1 ? (
          "Dashboard"
        ) : user?.isVerify === -1 ? (
          "Your organization denied your verification. Cannot create company or job."
        ) : (
          "Still not verified by your company. Great Hire has sent a link to your organization to verify you."
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RecruiterDashboard;
