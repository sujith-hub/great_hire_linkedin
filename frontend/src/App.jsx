import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/user/Signup.jsx";
import RecrutierSignup from "./components/auth/recruiter/Signup.jsx";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import JobDescription from "./pages/JobDescription";
import Jobs from "./components/Jobs";
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import RefundAndReturnPolicy from "./pages/policies/RefundAndReturnPolicy";
import TermsAndConditions from "./pages/policies/TermsAndConditions";
import Profile from "./pages/Profile";
import OurService from "./pages/OurService";
import { JobDetailsProvider } from "./context/JobDetailsContext";
import PostJobForm from "./pages/recruiter/PostJobForm";

import MainApply from "./components/ApplyJobs/MainApply";
import ReportJob from "./pages/ReportJob";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Success from "./pages/Success";
import PageNotFound from "./pages/PageNotFound";
import JobServicePlans from "./pages/JobServicePlans";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/recruiter/signup",
    element: <RecrutierSignup />,
  },
  {
    path: "/recruiter/post-job",
    element: <PostJobForm />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/apply",
    element: <MainApply />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/policy/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/policy/refund-policy",
    element: <RefundAndReturnPolicy />,
  },
  {
    path: "/policy/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/report-job/:id",
    element: <ReportJob />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/great-hire/services",
    element: <OurService />,
  },
  {
    path: "/job-service/plans",
    element: <JobServicePlans />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <div>
      <JobDetailsProvider>
        <RouterProvider router={appRouter} />
      </JobDetailsProvider>
    </div>
  );
}

export default App;
