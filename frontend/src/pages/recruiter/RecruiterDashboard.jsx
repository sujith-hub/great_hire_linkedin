import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const RecruiterDashboard = () => {
  const {user} = useSelector((state) => state.auth);

  return (
    <>
      <Navbar/>
      <div>
      {(user.isVerify === 1)?"Dashboard":(user.isVerify === -1)?"Your organisation denied your verification. can not create company, job.":"still you are not verified by your company. Great Hire send a link to your organisaton to verify you"}
    </div>
    <Footer/>
    </>
  )
}

export default RecruiterDashboard