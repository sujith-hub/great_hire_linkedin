import React, { useState } from "react";
import ApplyForm from "./ApplyForm";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainApply = () => {
  const [right, setRight] = useState(true);

  return (
    <div>
      <Navbar />
      <div className="flex shadow-lg rounded-lg justify-center bg-gradient-to-r from-blue-100 via-gray-100 to-blue-100 w-full">
        
        <div className="w-1/2 py-2">
        <ApplyForm setRight={setRight} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainApply;
