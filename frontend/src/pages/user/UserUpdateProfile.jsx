import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setUser } from "@/redux/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/ApiEndPoint";

const UserUpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.emailId.email || "",
    phoneNumber: user?.phoneNumber.number || "",
    bio: user?.profile?.bio || "",
    experience: user?.profile?.experience?.duration || "",
    skills: user?.profile?.skills?.join(", ") || "",
    resume: user?.profile?.resume || "",
    profilePhoto: user?.profile?.profilePhoto || "",
    address: user?.address?.city || "",
  });

  const [previewImage, setPreviewImage] = useState(user?.profile?.profilePhoto || "");

  useEffect(() => {
    if (user?.profile?.profilePhoto) {
      setPreviewImage(user?.profile?.profilePhoto);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setInput((prev) => ({ ...prev, profilePhoto: file }));
    }
  };

  const removeResume = () => {
    setInput((prev) => ({ ...prev, resume: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("experience", input.experience);
    formData.append("skills", input.skills);
    formData.append("address", input.address);

    if (input.resume) {
      formData.append("resume", input.resume);
    }
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      setLoading(true);
      const response = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success("Profile updated successfully!");
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white sm:max-w-[500px] w-full p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Update Profile</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Profile Image */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profilePhoto" className="text-right">
              Profile Image
            </Label>
            <div className="col-span-3 space-y-2">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border"
                />
              ) : (
                <p>No image uploaded</p>
              )}
              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Fullname */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullname" className="text-right">
              Name
            </Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={input.address}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Enter your address"
            />
          </div>

          {/* Resume */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resume" className="text-right">
              Resume
            </Label>
            <div className="col-span-3 space-y-2">
              {input.resume && typeof input.resume !== "string" && (
                <div className="flex items-center space-x-2">
                  <span>{input.resume.name}</span>
                  <button
                    type="button"
                    onClick={removeResume}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              )}
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="animate-spin" /> : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateProfile;
