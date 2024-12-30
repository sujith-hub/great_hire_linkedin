import { createSlice } from "@reduxjs/toolkit";

// Define the initial state with plans
const initialState = {
  jobPlans: [
    {
      isBestValue: false,
      headline: "Resume rebuild & repositioning",
      price: "750",
      duration: "",
      setupFee: "",
      subHeading: "Best for VP to CxO level positioning - Tech and Non Tech",
      validity: "",
      detalisList: [
        "3 half hour coaching sessions with our founder - Ex-Google",
        "Deep consultation on positioning to stand out",
        "Interview coaching as required",
        "Resume reformat - ATS alignment",
        "Customization of resume to a particular industry or job",
        "Application strategy coaching",
        "Resume build portfolio available upon request",
      ],
    },
    {
      isBestValue: false,
      headline: "Mock interview / Interview prep",
      price: "500",
      duration: "",
      setupFee: "",
      subHeading:
        "Prep for Marketing, Product, Sales and VP/Director role interviews",
      validity: "",
      detalisList: [
        "Mock interview - At Google, I interviewed and hired 100's",
        "Two 45 minute sessions with Ashwin for targeted sessions",
        "Real time feedback",
        "Framing, confidence, empathy, value communication",
      ],
    },
    {
      isBestValue: false,
      headline: "Resume Build (Mid to Senior)",
      price: "350",
      duration: "",
      setupFee: "+$25 Setup fee",
      subHeading:
        "Best for mgr level to director positioning, Tech or Non Tech",
      validity: "Valid for one month",
      detalisList: [
        "Two, 30 mi sessions with our resume coach",
        "Resume fit for the ATS & the human eye",
        "Linkedin Optimization Tips",
        "Interview prep and career story",
      ],
    },
    {
      isBestValue: false,
      headline: "Coaching sessions",
      price: "150",
      duration: "",
      setupFee: "",
      subHeading:
        "45 minute coaching sessions on application strategy, interview prep, offer negotiations or resume",
      validity: "Valid for 4 weeks",
      detalisList: [
        "With our Founder and CEO",
        "Resume positioning - how to best amplify for your strengths",
        "Offer negotiation -avg. salary data and negotiation strategy",
        "Interview prep - targeted prep for interview success",
      ],
    },
    {
      isBestValue: false,
      headline: "Advanced",
      price: "150",
      duration: "Every week",
      setupFee: "",
      subHeading: "Customized resumes for every application",
      validity: "",
      detalisList: [
        "Customized resumes (ATS optimized, Custom resume summary)",
        "Up to 25 job applications / week",
        "Dedicated analyst",
      ],
    },
    {
      isBestValue: true,
      headline: "Plus",
      price: "100",
      duration: "Every week",
      setupFee: "",
      subHeading: "Everything in Starter + More Applications",
      validity: "",
      detalisList: [
        "Everything in Starter",
        "Up to 75 Job Applications / week",
        "Job targeting complexity - Medium (3-6 job titles)",
        "Analyst support (8 hour turnaround)",
        "Interview monitoring & alerts",
      ],
    },
    {
      isBestValue: false,
      headline: "Starter",
      price: "50",
      duration: "Every week",
      setupFee: "+$25 Setup fee (Refunded on cancel <5 days)",
      subHeading: "Basic job application package",
      validity: "",
      detalisList: [
        "Initial consultation",
        "Up to 50 applications / week",
        "Custom Application Tracker",
        "Analyst support",
        "Job targeting complexity - Low (1-3 job titles)",
      ],
    },
    {
      isBestValue: false,
      headline: "January Promo Plan",
      price: "30",
      duration: "Every week",
      setupFee: "",
      subHeading:
        "Ideal for trying out the service with a low but targeted application volume",
      validity: "",
      detalisList: [
        "Up to 15 applications per week",
        "Dedicated human analyst with live support",
        "AI and human based job matching and curation for targeting",
        "Customized application tracker",
        "10% discount on all Mobius services",
        "Daily application updates",
      ],
    },
    {
      isBestValue: false,
      headline: "Search and Curation",
      price: "15",
      duration: "Every week",
      setupFee: "+$20 Onboarding and intake fee",
      subHeading:
        "Our team will find the jobs that match your profile just right",
      validity: "Valid for 4 weeks",
      detalisList: [
        "Personalized application tracker",
        "Up to 5 job titles within search",
        "Dedicated human analyst to support your search",
        "Application tracker updated every 48 hrs with new jobs",
        "Intake and onboarding with our job analytics team",
        "AI and human based filtering of jobs",
      ],
    },
    {
      isBestValue: false,
      headline: "One Time - Applications Add On (50)",
      price: "80",
      duration: "",
      setupFee: "",
      subHeading: "50 additional applications in a one week period",
      validity: "Valid for one week",
      detalisList: ["Add more application volume to your plan"],
    },
    {
      isBestValue: false,
      headline: "Hiring Manager Connect Database",
      price: "250",
      duration: "",
      setupFee: "",
      subHeading: "Database of hiring manager & recruiter contacts",
      validity: "",
      detalisList: [
        "Custom targeting criteria (job title, industry, location etc",
        "500+ emails & linkedin URL's",
        "Live analyst support",
        "30+ attributes in contact database",
      ],
    },
    {
      isBestValue: false,
      headline: "ATS Resume Reformatting & Customization",
      price: "100",
      duration: "",
      setupFee: "",
      subHeading:
        "Basic resume package - reformat & basic cleanup / customization to get your resume conversion rate up",
      validity: "Valid for one month",
      detalisList: [
        "Dedicated analyst",
        "Full reformat to our proven ATS friendly resume template",
        "Resume portfolio available on request",
        "Minor customizations to have a more crisp positioning",
      ],
    },
  ],
};

// Create the slice
const jobPlansSlice = createSlice({
  name: "jobPlans",
  initialState,
  reducers: {
    // Action to fetch a plan by ID
    getPlanById: (state, action) => {
      const planId = action.payload;
      return state.jobPlans.find((plan) => plan.id === planId);
    },
  },
});

// Export actions and reducer
export const { getPlanById } = jobPlansSlice.actions;
export default jobPlansSlice.reducer;
