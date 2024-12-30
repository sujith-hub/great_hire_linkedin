import React, { useEffect, useState } from "react";
import {
  VERIFICATION_API_END_POINT,
  USER_API_END_POINT,
} from "@/utils/ApiEndPoint";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VerifyOTP = ({ token, setToken }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30); // Timer starts at 30 seconds

  // Timer Logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval); // Clear the interval on unmount
    }
  }, [timer]);

  const verifyOTP = async () => {
    if (token && otp) {
      setLoading(true);
      try {
        // First, verify the token
        let response = await axios.post(
          `${VERIFICATION_API_END_POINT}/verify-token`,
          { token }
        );
        if (response?.data?.success) {
          const decoded = response?.data?.decoded;

          // Now, verify the OTP
          response = await axios.post(
            `${VERIFICATION_API_END_POINT}/verify-otp`,
            {
              decodedOTP: decoded?.otp,
              otp,
            }
          );

          if (response?.data?.success) {
            // OTP verified, proceed to registration
            const formData = decoded.formData;
            response = await axios.post(`${USER_API_END_POINT}/register`, {
              ...formData,
            });

            if (response?.data?.success) {
              toast.success(response.data.message);
              setToken(null);
              navigate("/login");
            } else {
              toast.error(response.data.message);
            }
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.log(`error in verify otp ${err}`);
        toast.error("Error verifying OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {token && (
        <div className="flex items-center justify-center p-6 w-full md:w-1/3">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-center mb-6">
              Great<span className="text-blue-700">Hire</span>
            </h1>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-bold mb-2"
              >
                Check Your Email
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={verifyOTP}
              disabled={!otp || loading} // Disable button if no OTP, timer expires, or loading
              className={`w-full py-2 text-white font-semibold rounded-lg ${
                !otp || loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-blue-700 hover:bg-blue-800"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {loading ? "Verifying..." : `Verify OTP (${timer}s)`} {/* Timer */}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyOTP;
