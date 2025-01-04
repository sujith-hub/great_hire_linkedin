import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const RecruiterHome = () => {
  const { company } = useSelector((state) => state.company);
  
  return (
    <p className="text-3xl font-bold text-blue-600">
      {company?.companyName}
    </p>
  );
};

export default RecruiterHome;
