import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const RecruiterDashboard = () => {
  const { user } = useSelector((state) => state.auth);

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

export default RecruiterDashboard;
