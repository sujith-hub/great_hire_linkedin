import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow p-4">Dashboard</div>
      <Footer />
    </div>
  );
};

export default Dashboard;
