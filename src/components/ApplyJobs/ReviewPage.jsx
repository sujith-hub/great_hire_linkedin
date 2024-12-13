import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { VscFilePdf } from "react-icons/vsc";
import { Link } from "react-router-dom";

const ReviewPage = ({ handleReview1, formData }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <BiArrowBack
          className="text-gray-600 cursor-pointer text-2xl"
          onClick={handleReview1}
        />
        <h6 className="ml-2 text-sm text-gray-500">Application step 5 of 5</h6>
      </div>

      <h2 className="text-2xl font-semibold mb-6">
        Please review your application
      </h2>

      <h4 className="text-lg font-medium mb-4">Contact Information</h4>
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <h3 className="text-base font-semibold">{`${formData.firstName} ${formData.lastName}`}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email Address</p>
          <h3 className="text-base font-semibold">abc123@gmail.com</h3>
          <small className="text-xs text-gray-500 block mt-2">
            To mitigate fraud, Indeed may mask your email address. If masked,
            the employer will see an address like
            <strong>abc123@gmail.com</strong>. Some employers, however, may
            still be able to unmask and see your actual email address.
          </small>
        </div>
        <div>
          <p className="text-sm text-gray-500">City, State</p>
          <h3 className="text-base font-semibold">{formData.city}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone Number</p>
          <h3 className="text-base font-semibold">{formData.phoneNumber}</h3>
        </div>
      </div>

      <h4 className="text-lg font-medium mb-4">Resume</h4>
      <div className="flex items-center mb-6 space-x-4">
        <VscFilePdf className="text-2xl text-gray-500" />
        <h3 className="text-base font-semibold">{formData.resume}</h3>
      </div>

      <h4 className="text-lg font-medium mb-4">Employee Questions</h4>
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Job Profile</p>
          <h3 className="text-base font-semibold">{formData.jobTitle}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">Company Name</p>
          <h3 className="text-base font-semibold">{formData.company}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            How many years of total work experience do you have?
          </p>
          <h3 className="text-base font-semibold">{formData.experience}</h3>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        If you notice an error in your application, please <br />
        <span className="underline cursor-pointer">contact Indeed</span>
      </p>

      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <h3 className="text-sm text-gray-700">
            Notify me by email when similar jobs are available
          </h3>
        </div>
        <small className="text-xs text-gray-500 block">
          By creating a job alert, you agree to our{" "}
          <span className="underline cursor-pointer">Terms</span>. You can
          change your consent settings at any time by unsubscribing or as
          detailed in our terms.
        </small>
      </div>

      <small className="text-xs text-gray-500 block mb-6">
        By pressing apply: 1) you agree to our{" "}
        <span className="underline cursor-pointer">
          Terms, Cookie & Privacy Policies
        </span>
        ; 2) you consent to your application being transmitted to the Employer
        (Indeed does not guarantee receipt), & processed & analyzed in
        accordance with its & Indeed's terms & privacy policies; & 3) you
        acknowledge that when you apply to jobs outside your country it may
        involve you sending your personal data to countries with lower levels of
        data protection.
      </small>

      <div className="text-center mb-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          <Link to="/success" className="text-white no-underline">
            Submit your application
          </Link>
        </button>
      </div>

      <p className="text-center text-sm text-gray-500">
        Having an issue with this application?{" "}
        <span className="underline cursor-pointer">Tell us more</span>
      </p>
    </div>
  );
};

export default ReviewPage;
