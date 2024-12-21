import React, { useState } from "react";
import Navbar from "../components/shared/Navbar";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import AppliedJobTable from "../components/AppliedJobTable";
import UpdateProfile from "../components/UpdateProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-8">
        {/* User Info Section */}
        <div className="flex flex-col items-center text-center border-b pb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage 
              src={user?.profile?.profilePhoto || "/default-profile.jpg"} 
              alt="Profile Photo" 
            />
          </Avatar>
          <h1 className="mt-4 text-2xl font-bold">{user?.fullname || "User Name"}</h1>
          <p className="text-gray-600">{user?.profile?.bio || "No bio available"}</p>
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
              <span className="text-gray-700">{user?.email || "Not Provided"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact className="text-gray-500" />
              <span className="text-gray-700">{user?.phoneNumber || "Not Provided"}</span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index} className="bg-gray-100 text-gray-700 border">
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
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Resume</h2>
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
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-8">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Applied Jobs</h2>
        <div className="mt-4">
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
