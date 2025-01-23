import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { JOB_API_END_POINT } from "@/utils/ApiEndPoint";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewPage = ({ handleReview1, input, fileURL }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const [fileUrl, setFileURL] = useState(
  //   input.resume ? URL.createObjectURL(input.resume) : null
  // );
  console.log(input);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log("User object:", user);
    console.log("Input object:", input);

    if (input.fullname !== user?.fullname) {
      formData.append("fullname", input.fullname);
    }
    if (input.email !== user?.emailId?.email) {
      formData.append("email", input.email);
    }
    if (input.phoneNumber && input.phoneNumber !== user?.phoneNumber?.number) {
      formData.append("phoneNumber", input.phoneNumber);

      if (input.resume) {
        formData.append("resume", input.resume);
      }

      try {
        setLoading(true);
        const response = await axios.post(
          `${JOB_API_END_POINT}/apply-job`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(setUser(response.data.user));
          toast.success("Profile updated successfully!");
          setOpen(false);
          navigate("/success");
        }
      } catch (err) {
        console.error("Error in API call:", err);
        toast.error(err.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
      // if (id) {
      //   handleSubmit();
      // }
    }

    return (
      <div className="flex justify-center flex-col p-6 bg-white shadow-lg rounded-lg w-full">
        <div className="flex items-center mb-6">
          <BiArrowBack
            className="text-gray-600 cursor-pointer text-2xl"
            onClick={handleReview1}
          />
          <h6 className="ml-2 text-sm text-gray-500">
            Application step 5 of 5
          </h6>
        </div>

        <h2 className="text-2xl font-semibold mb-6">
          Please review your application
        </h2>

        <h4 className="text-lg font-medium mb-4">Contact Information</h4>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <h3 className="text-base font-semibold">{`${input.fullname}`}</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <h3 className="text-base font-semibold">{input.email}</h3>
            <small className="text-xs text-gray-500 block mt-2">
              To mitigate fraud, Great Hire may mask your email address. If
              masked, the employer will see an address like
              <strong> abc123@gmail.com</strong>. Some employers, however, may
              still be able to unmask and see your actual email address.
            </small>
          </div>
          <div>
            <p className="text-sm text-gray-500">City, State</p>
            <h3 className="text-base font-semibold">{input.address}</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <h3 className="text-base font-semibold">{input.number}</h3>
          </div>
        </div>

        <p className=" text-gray-500 text-2xl">Resume</p>
        <div className="h-96">
          <Viewer fileUrl={fileURL || input.resume} />
        </div>

        <h4 className="text-lg font-medium mb-4">Employee Questions</h4>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Job Profile</p>
            <h3 className="text-base font-semibold">{input?.jobTitle}</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">Company Name</p>
            <h3 className="text-base font-semibold">{input?.company}</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              How many years of total work experience do you have?
            </p>
            <h3 className="text-base font-semibold">{input?.experience}</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cover Letter</p>
            <h3 className="text-base font-semibold">{input?.coverLetter}</h3>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          If you notice an error in your application, please <br />
          <Link to="/contact" className="underline cursor-pointer">
            contact Great Hire
          </Link>
        </p>

        <div className="mb-6">
          <small className="text-xs text-gray-500 block">
            By creating a job alert, you agree to our{" "}
            <Link
              to="/policy/privacy-policy"
              className="underline cursor-pointer"
            >
              Terms
            </Link>
            . You can change your consent settings at any time by unsubscribing
            or as detailed in our terms.
          </small>
        </div>

        <small className="text-xs text-gray-500 block mb-6">
          By pressing apply: 1) you agree to our{" "}
          <Link
            to="/policy/privacy-policy"
            className="underline cursor-pointer"
          >
            Terms, Cookie & Privacy Policies
          </Link>
          ; 2) you consent to your application being transmitted to the Employer
          (Great Hire does not guarantee receipt), & processed & analyzed in
          accordance with its & Great Hire's terms & privacy policies; & 3) you
          acknowledge that when you apply to jobs outside your country it may
          involve you sending your personal data to countries with lower levels
          of data protection.
        </small>

        <div className="text-center mb-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Submit your application
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Having an issue with this application?{" "}
          <Link
            to="/contact"
            className="underline text-blue-700 cursor-pointer"
          >
            Tell us more
          </Link>
        </p>
      </div>
    );
  };
};

export default ReviewPage;
