<<<<<<< HEAD
import React from 'react';
import { useSelector } from 'react-redux';
=======
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
>>>>>>> 16c1c8fc7eb772a1a81953b2d1135008252c217f
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { COMPANY_API_END_POINT } from '@/utils/ApiEndPoint';
import axios from 'axios';
import { addCompany } from '@/redux/companySlice';

const RecruiterDashboard = () => {
  const { user } = useSelector((state) => state.auth);
<<<<<<< HEAD

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow p-4">
        {user.isVerify === 1
          ? "Dashboard"
          : user.isVerify === -1
          ? "Your organisation denied your verification. Cannot create company, job."
          : "Still, you are not verified by your company. Great Hire sent a link to your organisation to verify you."}
      </div>

      {/* Footer at the bottom */}
      <Footer className="mt-auto" />
    </div>
  );
};

=======
  const { company } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyByUserId = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${COMPANY_API_END_POINT}/company-by-userid`, 
          {userId: user?._id},
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
    <>
      <Navbar />
      <div>
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
      <Footer />
    </>
  );
};

>>>>>>> 16c1c8fc7eb772a1a81953b2d1135008252c217f
export default RecruiterDashboard;
