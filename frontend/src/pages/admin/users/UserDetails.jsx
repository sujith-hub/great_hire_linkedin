// Import necessary modules and dependencies
import React, { useEffect, useState } from "react";
import ApplicationList from "./ApplicationList";
import Navbar from "@/components/admin/Navbar";
import { Badge } from "../../../components/ui/badge";
import { useParams } from "react-router-dom";
import { ADMIN_USER_DATA_API_END_POINT } from "@/utils/ApiEndPoint";
import axios from "axios";

const UserDetails = () => {
  // Extracting userId from URL parameters
  const { userId } = useParams();

  // State to store user details
  const [user, setUser] = useState(null);

  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // State to store user's job applications
  const [applications, setApplications] = useState([]);

  // Function to fetch user details from the API
  const fetchUser = async () => {
    try {
      setLoading(true); // Set loading state to true before making API call

      const response = await axios.get(
        `${ADMIN_USER_DATA_API_END_POINT}/getUser/${userId}`,
        {
          withCredentials: true, // Ensures cookies are sent with the request for authentication
        }
      );

      if (response.data.success) {
        setUser(response.data.data); // Update state with fetched user data
      }
    } catch (err) {
      console.log(`Error in fetching user data: ${err}`);
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  // Function to fetch applications submitted by the user
  const fetchApplications = async () => {
    try {
      setLoading(true); // Set loading state to true before making API call

      const response = await axios.get(
        `${ADMIN_USER_DATA_API_END_POINT}/user-all-application/${userId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setApplications(response.data.data); // Update state with user's applications
      }
    } catch (err) {
      console.log(`Error in fetching user applications: ${err}`);
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };
  
  // Fetch user details and applications when the component mounts
  useEffect(() => {
    fetchUser();
    fetchApplications();
  }, []);

  // Function to check if a given URL is a valid image URL
  const isValidImageURL = (url) => {
    try {
      const parsed = new URL(url); // Parse the URL
      return (
        ["https:", "http:"].includes(parsed.protocol) && // Ensure the protocol is HTTP or HTTPS
        /\.(jpeg|jpg|png|gif|webp|svg)$/i.test(parsed.pathname) // Check for valid image file extensions
      );
    } catch {
      return false; // Return false if the URL is invalid
    }
  };
  // console.log(user);
  // console.log("jobProfile:", user.profile?.experience?.jobProfile);
  // console.log("duration:", user.profile?.experience?.duration);
  
  
  return (
    <>
      <Navbar linkName="User Details" />
      <div className="flex shadow-md rounded-lg flex-col md:flex-row bg-white m-4 p-4">
        {/* Left Side: User Details */}
        {loading ? (
          <p className="text-2xl text-blue-700">Loading...</p>
        ) : (
          <div className="md:w-1/3 border-r-2 border-gray-300 md:pr-6">
            <div className="flex flex-col items-center">
              <img
                src={isValidImageURL(user?.profile?.profilePhoto) ? encodeURI(user.profile.profilePhoto) : "/default-profile.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <h2 className="mt-4 text-2xl font-bold">{user?.fullname}</h2>
              <p className="text-gray-600">{user?.emailId?.email || user?.email }</p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {user?.phoneNumber?.number}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {user?.address?.city}, {user?.address?.state},{" "}
                {user?.address?.country}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold">About Me</h3>
              <p className="text-gray-700">{user?.profile?.bio}</p>
            </div>
            {/* Additional Professional Details */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Professional Details</h3>
              {user?.profile?.coverLetter && (
                <div className="mt-2">
                  <h4 className="text-lg font-semibold">Cover Letter</h4>
                  <p className="text-gray-700 h-24 overflow-y-scroll p-2">
                    {user?.profile?.coverLetter}
                  </p>
                </div>
              )}
              {user?.profile?.experience && (
                <div className="mt-2">
                  <h4 className="text-lg font-semibold">Experience</h4>
                  <p>
                    <span className=" font-bold">Company:</span>{" "}
                    {user?.profile?.experience.companyName}
                  </p>
                  <p>
                    <span className="font-bold">Job Profile:</span>{" "}
                    {user?.profile?.experience.jobProfile}
                  </p>
                  <p>
                    <span className="font-bold">Duration:</span>{" "}
                    {user?.profile?.experience.duration}
                  </p>
                  <span className="font-bold">Details:</span>{" "}
                  <p className="h-28 overflow-y-scroll">
                    {user?.profile?.experience.experienceDetails}
                  </p>
                </div>
              )}
              {/* Skills Section */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Skills
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {user?.profile?.skills?.length > 0 ? (
                    user?.profile.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-blue-100 hover:bg-gray-200 px-4 py-2 text-blue-800 rounded-lg font-medium text-sm"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-600">No skills listed</span>
                  )}
                </div>
              </div>
              {user?.profile?.resume && (
                <div className="mt-2">
                  <h4 className="text-lg font-semibold">Resume</h4>
                  <a
                    href={user.profile.resume && encodeURI(user.profile.resume)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {user.profile.resumeOriginalName || "View Resume"}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Right Side: Application List */}
        <div className="md:w-2/3 mt-6 md:mt-0 md:pl-6">
          {loading ? (
            <p className="text-2xl text-blue-700">Loading..</p>
          ) : (
            <ApplicationList applications={applications} />
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
