import React from 'react'
import { useSelector } from 'react-redux';

const RecruiterHome = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div>RecruiterHome</div>
  )
}

export default RecruiterHome;