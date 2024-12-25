import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "../components/ui/button";

const RecruiterProfile = () => {
    const [subscriptionStatus, setSubscriptionStatus] = useState("No");
    const [postedJobs, setPostedJobs] = useState(0);

    const toggleSubscriptionStatus = () => {
      setSubscriptionStatus((prevStatus) => (prevStatus === "No" ? "Yes" : "No"));
    };

  const incrementPostedJobs = () => {
    setPostedJobs((prevJobs) => prevJobs + 1);
  };

  const decrementPostedJobs = () => {
    setPostedJobs((prevJobs) => (prevJobs > 0 ? prevJobs - 1 : 0));
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-8">
        {/* User Info Section */}
        <div className="flex flex-col items-center text-center border-b pb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={"/default-profile.jpg"} alt="Profile Photo" />
          </Avatar>
          <h1 className="mt-4 text-2xl font-bold">Nazir</h1>
          <p className="text-gray-600">I am a recruiter.</p>
          <Button
            onClick={() => alert("Edit Profile clicked")}
            variant="outline"
            className="mt-4 flex items-center gap-2"
          >
            <Pen className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Contact Information Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Contact Information
          </h2>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" />
              <span className="text-gray-700">info@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact className="text-gray-500" />
              <span className="text-gray-700">9876543210</span>
            </div>
          </div>
        </div>

       {/* Subscription Status Section */}
       <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Subscription Status
          </h2>
          <div className="mt-4 gap-4 ">
            Have You Subscribed ?
            <Button
              onClick={toggleSubscriptionStatus}
              className={`rounded-md ${
                subscriptionStatus === "No"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {subscriptionStatus}
            </Button>
          </div>
        </div>
     
        {/* Posted Jobs Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Posted Jobs
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-gray-700">Number of Posted Jobs: {postedJobs}</span>
            <button
              onClick={incrementPostedJobs}
              className="bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              ↑
            </button>
            <button
              onClick={decrementPostedJobs}
              className="bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;

