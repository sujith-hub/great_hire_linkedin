import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "../../components/ui/button";
import RecruiterUpdateProfile from "./RecruiterUpdateProfile";
import { useSelector } from "react-redux";
import Footer from "@/components/shared/Footer";

const RecruiterProfile = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState("No");
  const [postedJobs, setPostedJobs] = useState(0);
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("https://github.com/shadcn.png");
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useSelector((store) => store.auth);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate image upload
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Set the uploaded image preview
        setSuccessMessage("Image uploaded successfully!");
        setTimeout(() => setSuccessMessage(""), 3000); // Hide the message after 3 seconds
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSubscriptionStatus = () => {
    setSubscriptionStatus((prevStatus) => (prevStatus === "No" ? "Yes" : "No"));
  };

  const incrementPostedJobs = () => {
    setPostedJobs((prevJobs) => prevJobs + 1);
  };

  const decrementPostedJobs = () => {
    setPostedJobs((prevJobs) => (prevJobs > 0 ? prevJobs - 1 : 0));
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (confirmDelete) {
      console.log("Account deletion logic goes here.");
      // Add API call or deletion logic here
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-8">
        {/* User Info Section */}
        <div className="flex flex-col items-center text-center border-b pb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
              alt="Profile Photo"
            />
          </Avatar>
          <h1 className="mt-4 text-2xl font-bold">{user?.fullname}</h1>
          <p className="text-gray-600">HR Manager</p>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="mt-4 flex items-center gap-2"
          >
            <Pen className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Contact Information Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Information</h2>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" />
              <span className="text-gray-700">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact className="text-gray-500" />
              <span className="text-gray-700">{user?.phoneNumber}</span>
            </div>
          </div>
        </div>

        {/* Subscription Status Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Subscription Status</h2>
          <div className="mt-4 gap-4">
            Have You Subscribed?
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
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Posted Jobs</h2>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-gray-700">Number of Posted Jobs: {postedJobs}</span>
            <button
              onClick={incrementPostedJobs}
              className="bg-green-500 text-white rounded-md hover:bg-green-600 px-2 py-1"
            >
              ↑
            </button>
            <button
              onClick={decrementPostedJobs}
              className="bg-red-500 text-white rounded-md hover:bg-red-600 px-2 py-1"
            >
              ↓
            </button>
          </div>
        </div>

        {/* Delete Account Button */}
        <div className="flex justify-center mt-10">
          <Button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white rounded-md hover:bg-red-600 px-6 py-2"
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Recruiter Update Profile */}
      <RecruiterUpdateProfile open={open} setOpen={setOpen} />

      {/* Footer */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default RecruiterProfile;
