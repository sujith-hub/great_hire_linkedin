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
import { JobDetailsProvider } from "./context/JobDetailsContext";

import MainApply from "./components/ApplyJobs/MainApply";
import ReportJob from "./pages/ReportJob";

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
