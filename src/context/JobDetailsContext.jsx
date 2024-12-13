import React, { createContext, useState, useContext } from "react";

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    companyName: "Amazon",
    experience:"2",
    rating: "3.1",
    location: "Navi Mumbai, Maharashtra",
    respond: "Typically responds within 1 day",
    salary: "₹20000 - ₹35000 per month",
    jobType: {
      type: "Remote",
      status: "",
    },
    duration: "Monday to Friday",
    details: [
      "Previous collections, customer service sales, or telemarketing experience required.",
      "Transport facility (As per policy and shift).",
      "Comprehensive benefits package available: including medical insurance",
    ],
    activeDay: "Active 2 days ago",
    isBookmark: false,
    isBlock: false,
    skills: [
      { skill: "Writing Skill", required: true, status: "" },
      { skill: "Editing", required: true, status: "" },
      { skill: "Research", required: false, status: "" },
      { skill: "AI", required: false, status: "" },
    ],
    educations: [
      { edu: "Bachelor", required: true, status: "" },
      { edu: "Master", required: true, status: "" },
    ],
    languages: [
      { lan: "Hindi", required: true, status: "" },
      { lan: "English", required: true, status: "" },
      { lan: "Bilingual", required: false, status: "" },
    ],
    benifits: [
      "This is a full-time or part-time REMOTE position",
      "You’ll be able to choose which projects you want to work on",
      "You can work on your own schedule",
      "Projects are paid hourly, starting at $20+ USD per hour, with bonuses for high-quality and high-volume work",
    ],
    responsibilities: [
      "This is a full-time or part-time REMOTE position",
      "Write high-quality answers when given specific prompts",
      "Compare the performance of different AI models",
      "Research and fact-check AI responses",
    ],
    qualifications: [
      "Fluent in Hindi + English",
      "A bachelor's degree (completed or in progress)",
      "Excellent writing and grammar skills",
      "Strong research and fact-checking skills to ensure accuracy and originality",
    ],
  },
  {
    id: 2,
    title: "Web Developer",
    companyName: "Microsoft",
    rating: "3.1",
    location: "Gurugram, Haryana",
    respond: "Typically responds within 1 day",
    salary: "₹20000 - ₹35000 per month",
    jobType: {
      type: "Full Time",
      status: "",
    },
    duration: "Monday to Friday",
    details: [
      "Previous collections, customer service sales, or telemarketing experience required.",
      "Transport facility (As per policy and shift).",
      "Comprehensive benefits package available: including medical insurance",
    ],
    activeDay: "Active 3 days ago",
    isBookmark: false,
    isBlock: false,
    skills: [
      { skill: "Writing Skill", required: true, status: "" },
      { skill: "Editing", required: true, status: "" },
      { skill: "Research", required: false, status: "" },
      { skill: "AI", required: true, status: "" },
    ],
    educations: [
      { edu: "Bachelor", required: true, status: "" },
      { edu: "Master", required: true, status: "" },
    ],
    languages: [
      { lan: "Hindi", required: true, status: "" },
      { lan: "English", required: true, status: "" },
      { lan: "Bilingual", required: false, status: "" },
    ],
    benefits: [
      "This is a full-time or part-time REMOTE position",
      "You’ll be able to choose which projects you want to work on",
      "You can work on your own schedule",
      "Projects are paid hourly, starting at $20+ USD per hour, with bonuses for high-quality and high-volume work",
    ],
    responsibilities: [
      "This is a full-time or part-time REMOTE position",
      "Write high-quality answers when given specific prompts",
      "Compare the performance of different AI models",
      "Research and fact-check AI responses",
    ],
    qualifications: [
      "Fluent in Hindi + English",
      "A bachelor's degree (completed or in progress)",
      "Excellent writing and grammar skills",
      "Strong research and fact-checking skills to ensure accuracy and originality",
    ],
  },
  {
    id: 3,
    title: "Data Scientist",
    companyName: "Google",
    rating: "3.1",
    location: "Noida, Uttar Pradesh",
    respond: "Typically responds within 1 day",
    salary: "₹20000 - ₹35000 per month",
    jobType: {
      type: "Part Time",
      status: "",
    },
    duration: "Monday to Friday",
    details: [
      "Previous collections, customer service sales, or telemarketing experience required.",
      "Transport facility (As per policy and shift).",
      "Comprehensive benefits package available: including medical insurance",
    ],
    activeDay: "Active 3 days ago",
    isBookmark: false,
    isBlock: false,
    skills: [
      { skill: "Writing Skill", required: true, status: "" },
      { skill: "Editing", required: true, status: "" },
      { skill: "Research", required: false, status: "" },
      { skill: "AI", required: true, status: "" },
    ],
    educations: [
      { edu: "Bachelor", required: true, status: "" },
      { edu: "Master", required: true, status: "" },
    ],
    languages: [
      { lan: "Hindi", required: true, status: "" },
      { lan: "English", required: true, status: "" },
      { lan: "Bilingual", required: false, status: "" },
    ],
    benefits: [
      "This is a full-time or part-time REMOTE position",
      "You’ll be able to choose which projects you want to work on",
      "You can work on your own schedule",
      "Projects are paid hourly, starting at $20+ USD per hour, with bonuses for high-quality and high-volume work",
    ],
    responsibilities: [
      "This is a full-time or part-time REMOTE position",
      "Write high-quality answers when given specific prompts",
      "Compare the performance of different AI models",
      "Research and fact-check AI responses",
    ],
    qualifications: [
      "Fluent in Hindi + English",
      "A bachelor's degree (completed or in progress)",
      "Excellent writing and grammar skills",
      "Strong research and fact-checking skills to ensure accuracy and originality",
    ],
  },
  {
    id: 4,
    title: "Data Engineer",
    companyName: "Netflix",
    rating: "3.1",
    location: "Jaipur, Rajasthan",
    respond: "Typically responds within 1 day",
    salary: "₹20000 - ₹35000 per month",
    jobType: {
      type: "Internship",
      status: "",
    },
    duration: "Monday to Friday",
    details: [
      "Previous collections, customer service sales, or telemarketing experience required.",
      "Transport facility (As per policy and shift).",
      "Comprehensive benefits package available: including medical insurance",
    ],
    activeDay: "Active 3 days ago",
    isBookmark: false,
    isBlock: false,
    skills: [
      { skill: "Writing Skill", required: true, status: "" },
      { skill: "Editing", required: true, status: "" },
      { skill: "Research", required: false, status: "" },
      { skill: "AI", required: true, status: "" },
    ],
    educations: [
      { edu: "Bachelor", required: true, status: "" },
      { edu: "Master", required: true, status: "" },
    ],
    languages: [
      { lan: "Hindi", required: true, status: "" },
      { lan: "English", required: true, status: "" },
      { lan: "Bilingual", required: false, status: "" },
    ],
    benefits: [
      "This is a full-time or part-time REMOTE position",
      "You’ll be able to choose which projects you want to work on",
      "You can work on your own schedule",
      "Projects are paid hourly, starting at $20+ USD per hour, with bonuses for high-quality and high-volume work",
    ],
    responsibilities: [
      "This is a full-time or part-time REMOTE position",
      "Write high-quality answers when given specific prompts",
      "Compare the performance of different AI models",
      "Research and fact-check AI responses",
    ],
    qualifications: [
      "Fluent in Hindi + English",
      "A bachelor's degree (completed or in progress)",
      "Excellent writing and grammar skills",
      "Strong research and fact-checking skills to ensure accuracy and originality",
    ],
  },
];

// Create Context
const JobDetailsContext = createContext();

// Custom Hook to use JobDetailsContext
export const useJobDetails = () => {
  return useContext(JobDetailsContext);
};

// Provider Component
export const JobDetailsProvider = ({ children }) => {
  const [jobsList, setJobsList] = useState(jobs);
  const [selectedJob, setSelectedJob] = useState(null);
  // Function to update skill status
  const updateSkillStatus = (skillName, response) => {
    setSelectedJob((prev) => {
      const updatedSkills = prev.skills.map((skill) =>
        skill.skill === skillName ? { ...skill, status: response } : skill
      );
      return { ...prev, skills: updatedSkills };
    });
  };

  // Function to update education status
  const updateEducationStatus = (educationName, response) => {
    setSelectedJob((prev) => {
      const updatedEducation = prev.educations.map((edu) =>
        edu.edu === educationName ? { ...edu, status: response } : edu
      );
      return { ...prev, educations: updatedEducation };
    });
  };

  // Function to update language status
  const updateLanguageStatus = (languageName, response) => {
    setSelectedJob((prev) => {
      const updatedLanguages = prev.languages.map((lang) =>
        lang.lan === languageName ? { ...lang, status: response } : lang
      );
      return { ...prev, languages: updatedLanguages };
    });
  };

  // Function to update job status if user like job type or not
  const updateJobStatus = (status) => {
    setSelectedJob((prevJob) => ({
      ...prevJob,
      jobType: {
        ...prevJob.jobType,
        status, // Update the status with the passed value
      },
    }));
  };

  const changeBookmarkStatus = () => {
    setSelectedJob((prevJob) => ({
      ...prevJob,
      isBookmark: !prevJob.isBookmark, // Correctly toggles the bookmark status
    }));
  };

  const changeBlockStatus = () => {
    selectedJob.isBlock = true;
    const updateJobList = jobsList.filter((job) => !job.isBlock);
    setJobsList(updateJobList);
  };

  // Filter function to update job list based on search input
  const filterJobs = (titleKeyword, location) => {
    const filteredJobs = jobs.filter((job) => {
      // Check if titleKeyword matches title, companyName, location, or jobType.type
      const isTitleMatch = titleKeyword
        ? [
            job.title.toLowerCase(),
            job.companyName.toLowerCase(),
            job.location.toLowerCase(),
            job.jobType.type.toLowerCase(),
          ].some((field) => field.includes(titleKeyword.toLowerCase()))
        : true;

      // Check if location matches location or jobType.type
      const isLocationMatch = location
        ? [job.location.toLowerCase(), job.jobType.type.toLowerCase()].some(
            (field) => field.includes(location.toLowerCase())
          )
        : true;

      // Return true if both conditions are met
      return isTitleMatch && isLocationMatch;
    });

    setJobsList(filteredJobs);
    setSelectedJob(filteredJobs[0] || null); // Set selected job to the first match or null if no matches
  };

  const resetFilter = () => {
    setJobsList(jobs);
    setSelectedJob(jobs[0]);
  };

  return (
    <JobDetailsContext.Provider
      value={{
        jobs: jobsList,
        selectedJob,
        setSelectedJob,
        updateSkillStatus,
        updateEducationStatus,
        updateLanguageStatus,
        updateJobStatus,
        filterJobs,
        resetFilter,
        changeBookmarkStatus,
        changeBlockStatus,
      }}
    >
      {children}
    </JobDetailsContext.Provider>
  );
};