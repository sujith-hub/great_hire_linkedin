import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { VscFilePdf } from "react-icons/vsc";
import { Link } from "react-router-dom";

const RecruiterReviewPage = ({ handleReview1, formData }) => {
  return (
    <div className="max-w-5xl justify-center mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <BiArrowBack
          className="text-gray-600 cursor-pointer text-2xl"
          onClick={handleReview1}
        />
        <h6 className="ml-2 text-sm text-gray-500">Application step 4 of 4</h6>
      </div>

      <h2 className="text-2xl text-center font-semibold mb-6">
        Review your job post details
      </h2>

      <h4 className="text-lg font-medium mb-4">Job Details</h4>
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Job title</p>
          <h3 className="text-base font-semibold">{formData.jobTitle}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">Job location Type</p>
          <h3 className="text-base font-semibold">{formData.jobLocationType}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">Job Address</p>
          <h3 className="text-base font-semibold">{formData.streetAdress}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">Job Type</p>
          <h3 className="text-base font-semibold">{formData.jobType}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">No. of opening</p>
          <h3 className="text-base font-semibold">{formData.hiringPeople}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">Hiring Timeline</p>
          <h3 className="text-base font-semibold">{formData.hiringTimeline}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">Company description</p>
          <h3 className="text-base font-semibold">{formData.companyDescription}</h3>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        If you notice an error in your job post, please <br />
        <Link to="/contact" className="underline cursor-pointer">
          contact Great Hire
        </Link>
      </p>

      {/* <div className="mb-6">
        <small className="text-xs text-gray-500 block">
          By creating a job alert, you agree to our{" "}
          <Link to="/policy/privacy-policy" className="underline cursor-pointer">
          Terms
        </Link>. You can
          change your consent settings at any time by unsubscribing or as
          detailed in our terms.
        </small>
      </div> */}

      <small className="text-xs text-gray-500 block mb-6">
        By pressing apply: 1) you agree to our{" "}
        <Link to="/policy/privacy-policy" className="underline cursor-pointer">
          Terms, Cookie & Privacy Policies
        </Link>
        ; 2) you consent to your application being transmitted to the Employer
        (Great Hire does not guarantee receipt), & processed & analyzed in
        accordance with its & Great Hire's terms & privacy policies; & 3) you
        acknowledge that when you apply to jobs outside your country it may
        involve you sending your personal data to countries with lower levels of
        data protection.
      </small>

      <div className="text-center mb-6">
        <button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          <Link to="/success" className="text-white no-underline">
            Submit your application
          </Link>
        </button>
      </div>

      <p className="text-center text-sm text-gray-500">
        Having an issue with this application?{" "}
        <Link to="/contact" className="underline text-blue-700 cursor-pointer">
          Tell us more
        </Link>
      </p>
    </div>
  );
};

export default RecruiterReviewPage;
