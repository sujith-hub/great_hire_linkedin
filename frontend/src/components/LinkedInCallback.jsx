import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const LinkedInCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleLinkedInLogin = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");

      if (code) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/linkedin/callback?code=${code}`,
            { withCredentials: true }
          );

          if (response?.data?.success) {
            dispatch(setUser(response.data.user));
            toast.success("Logged in successfully with LinkedIn!");
            navigate("/profile");
          } else {
            toast.error("LinkedIn login failed!");
            navigate("/signup");
          }
        } catch (error) {
          console.error("LinkedIn login error:", error);
          toast.error("Error during LinkedIn login.");
          navigate("/signup");
        }
      } else {
        toast.error("No LinkedIn code found.");
        navigate("/signup");
      }
    };

    handleLinkedInLogin();
  }, [dispatch, navigate, location]);

  return <div>Logging you in via LinkedIn...</div>;
};

export default LinkedInCallback;
