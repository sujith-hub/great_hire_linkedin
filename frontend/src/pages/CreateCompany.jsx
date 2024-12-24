import { useState } from "react";
import img from "../assets/img7.png";
import { useDropzone } from "react-dropzone";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "react-circular-progressbar/dist/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/ApiEndPoint";
import axios from "axios";
import { addCompany } from "@/redux/companySlice";

const CreateCompany = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    industry: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    email: "",
    phone: "",
    recruiterPosition: "",
    recruiterPhone: user?.phoneNumber || "",
    taxId: "",
    businessFile: null,
    isAgree: false,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData({ ...formData, businessFile: file });
      setFileUploaded(false);
      setUploadProgress(0);

      // Simulating upload
      const uploadSimulation = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(uploadSimulation);
            setFileUploaded(true);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if(res.data.success){

      }
    } catch (err) {
      console.log(`error in submitting company details ${err}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex m-2">
        <div className="w-full md:w-1/2 flex flex-col space-y-2 p-4">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Company Details Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Company Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Company Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-600">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Company Website</label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Address Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Address Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-600">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block w-full text-gray-600">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Contact Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-600">
                    Business Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Verification Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Verification Details
              </h2>
              <div className="mt-4">
                <label className="block text-gray-600">
                  Tax ID/Registration Number
                </label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-blue-500"
                  placeholder="Leave empty if uploading a file"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-600">
                  Upload Business License
                </label>
                <div
                  {...getRootProps()}
                  className={`relative border-2 border-dashed border-blue-500 p-4 rounded-lg h-48 flex items-center justify-center cursor-pointer transition-all ${
                    isDragActive ? "bg-blue-100 border-blue-400" : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <input {...getInputProps()} />
                  {uploadProgress > 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
                      <div className="w-20">
                        <CircularProgressbar
                          value={uploadProgress}
                          text={`${uploadProgress}%`}
                          styles={buildStyles({
                            textColor: "#3b82f6",
                            pathColor: "#3b82f6",
                            trailColor: "#d1d5db",
                          })}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center">
                      {isDragActive
                        ? "Drop the file here..."
                        : "Drag & Drop your file here or click to upload"}
                    </p>
                  )}
                </div>
                {formData.businessFile && (
                  <p className="mt-2 text-green-500 text-center">
                    File ready: {formData.businessFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Section 5: Recruiter Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Recruiter Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-600">
                    Your Position in the Company
                  </label>
                  <input
                    type="text"
                    name="recruiterPosition"
                    value={formData.recruiterPosition}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">
                    Your Mobile Number
                  </label>
                  <input
                    type="text"
                    name="recruiterPhone"
                    value={formData.recruiterPhone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Agreement Section */}
            <div>
              <label className="block text-gray-600">
                <input
                  type="checkbox"
                  name="isAgree"
                  className="mr-2"
                  required
                  onChange={handleCheckboxChange}
                />
                I agree to provide accurate company details.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create Company"}
            </button>
          </form>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img src={img} alt="bg" className="w-full h-full object-cover" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateCompany;
