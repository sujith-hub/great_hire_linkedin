import React, { createContext, useState, useContext, useEffect } from "react";
import { JOB_API_END_POINT } from "@/utils/ApiEndPoint";


const JobDetailsContext = createContext();

export const useJobDetails = () => useContext(JobDetailsContext);

export const JobDetailsProvider = ({ children }) => {
  const [jobsList, setJobsList] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${JOB_API_END_POINT}/get`);
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jobs = await response.json();
        setJobsList(jobs);
        setSelectedJob(jobs[0] || null); // Set the first job as selected by default
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("An error occurred while fetching jobs.");
      }
    };

    fetchJobs();
  }, []);

  const updateSkillStatus = (skillName, response) => {
    setSelectedJob((prev) => {
      const updatedSkills = prev.skills.map((skill) =>
        skill.skill === skillName ? { ...skill, status: response } : skill
      );
      return { ...prev, skills: updatedSkills };
    });
  };

  const updateEducationStatus = (educationName, response) => {
    setSelectedJob((prev) => {
      const updatedEducation = prev.educations.map((edu) =>
        edu.edu === educationName ? { ...edu, status: response } : edu
      );
      return { ...prev, educations: updatedEducation };
    });
  };

  const updateLanguageStatus = (languageName, response) => {
    setSelectedJob((prev) => {
      const updatedLanguages = prev.languages.map((lang) =>
        lang.lan === languageName ? { ...lang, status: response } : lang
      );
      return { ...prev, languages: updatedLanguages };
    });
  };

  const updateJobStatus = (status) => {
    setSelectedJob((prevJob) => ({
      ...prevJob,
      jobType: {
        ...prevJob.jobType,
        status,
      },
    }));
  };

  const changeBookmarkStatus = () => {
    setSelectedJob((prevJob) => ({
      ...prevJob,
      isBookmark: !prevJob.isBookmark,
    }));
  };

  const changeBlockStatus = () => {
    setSelectedJob((prevJob) => ({
      ...prevJob,
      isBlock: true,
    }));
    setJobsList(jobsList.filter((job) => job.id !== prevJob.id));
  };

  const filterJobs = (titleKeyword, location) => {
    const filteredJobs = jobsList.filter((job) => {
      const isTitleMatch = titleKeyword
        ? [job.title, job.companyName, job.location, job.jobType.type]
            .map((field) => field.toLowerCase())
            .some((field) => field.includes(titleKeyword.toLowerCase()))
        : true;
      const isLocationMatch = location
        ? [job.location, job.jobType.type]
            .map((field) => field.toLowerCase())
            .some((field) => field.includes(location.toLowerCase()))
        : true;
      return isTitleMatch && isLocationMatch;
    });

    setJobsList(filteredJobs);
    setSelectedJob(filteredJobs[0] || null);
  };

  const resetFilter = () => {
    setJobsList(jobsList);
    setSelectedJob(jobsList[0]);
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
        error,
      }}
    >
      {children}
    </JobDetailsContext.Provider>
  );
};
