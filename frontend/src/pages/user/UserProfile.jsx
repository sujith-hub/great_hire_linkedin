import React, { useState } from "react";
import Navbar from "../../components/shared/Navbar";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { FaRegAddressCard } from "react-icons/fa";
import { LuPhoneIncoming } from "react-icons/lu";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import AppliedJobTable from "../job/AppliedJobTable";
import UserUpdateProfile from "./UserUpdateProfile";
import { useSelector, useDispatch } from "react-redux";
import Footer from "@/components/shared/Footer";
import { USER_API_END_POINT } from "@/utils/ApiEndPoint";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/redux/authSlice";
import { toast } from "react-hot-toast";
import { MdOutlineVerified } from "react-icons/md";
import VerifyEmail from "@/components/VerifyEmail";
import VerifyNumber from "@/components/VerifyNumber";

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openEmailOTPModal, setOpenEmailOTPModal] = useState(false);
  const [openNumberOTPModal, setOpenNumberOTPModal] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${USER_API_END_POINT}/delete`, {
        data: { email: user?.email }, // Pass email in the `data` property
        withCredentials: true,
      });
      if (response.data.success) {
        navigate("/");
        dispatch(logOut());
      }
      toast.success(response.data.message);
    } catch (err) {
      console.log(`Error: in deleting account ${err.message}`);
      toast.error("Error in deleting account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-8">
          {/* User Info Section */}
          <div className="flex flex-col items-center text-center border-b pb-8">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
                alt="Profile Photo"
              />
            </Avatar>
            <h1 className="mt-4 text-2xl font-bold">
              {user?.fullname || "User Name"}
            </h1>
            <p className="text-gray-700">
              {user?.profile?.bio || "No bio available"}
            </p>
            <p className="text-gray-500">
              {"Experience: " + user?.profile?.experience?.duration + " Year" ||
                "No Experience"}
            </p>
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
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Contact Information
            </h2>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-500" />
                <span className="text-gray-700">
                  {user?.emailId.email || "Not Provided"}
                </span>
                {!user?.emailId.isVerified ? (
                  <span
                    className="text-green-600 text-md cursor-pointer hover:text-green-700"
                    onClick={() => setOpenEmailOTPModal(true)}
                  >
                    Verify
                  </span>
                ) : (
                  <span className="flex  items-center text-green-600 bg-green-50 px-2 rounded-lg gap-1">
                    <MdOutlineVerified size={25} /> <span>Verified</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <LuPhoneIncoming size={25} className="text-gray-500" />
                <span className="text-gray-700">
                  {user?.phoneNumber.number || "Not Provided"}
                </span>
                {!user?.phoneNumber.isVerified ? (
                  <span
                    className="text-green-600 text-md cursor-pointer hover:text-green-700"
                    onClick={() => setOpenNumberOTPModal(true)}
                  >
                    Verify
                  </span>
                ) : (
                  <span className="flex  items-center text-green-600 bg-green-50 px-2 rounded-lg gap-1 ">
                    <MdOutlineVerified size={25} /> <span>Verified</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <FaRegAddressCard size={25} className="text-gray-500" />
                <span className="text-gray-700">
                  {user?.address ? `${user.address.city}, ${user.address.state}, ${user.address.country} ` : "Not Provided"}
                </span>
                
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Skills
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg font-bold text-sm"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-600">No skills listed</span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Resume
            </h2>
            <div className="mt-4">
              {user?.profile?.resume ? (
                <a
                  href={user.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  View Resume
                </a>
              ) : (
                <span className="text-gray-600">No resume uploaded</span>
              )}
            </div>
          </div>

          {/* Delete Account Button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              className={`bg-red-500 text-white hover:bg-red-700 ${
                loading && "cursor-not-allowed bg-red-400"
              }`}
            >
              {loading ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-8">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Applied Jobs
          </h2>
          <div className="mt-4">
            <AppliedJobTable />
          </div>
        </div>
      </div>

      <UserUpdateProfile open={open} setOpen={setOpen} />
      <Footer className="mt-auto" />

      {openEmailOTPModal && <VerifyEmail setOpenEmailOTPModal = {setOpenEmailOTPModal}/>}
      {openNumberOTPModal && <VerifyNumber setOpenNumberOTPModal = {setOpenNumberOTPModal}/>}
    </div>
  );
};

export default UserProfile;
