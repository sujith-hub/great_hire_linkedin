import React, { createContext, useState, useContext, useEffect } from "react";
import { JOB_API_END_POINT } from "@/utils/ApiEndPoint";

const JobDetailsContext = createContext();

export const useJobDetails = () => useContext(JobDetailsContext);

export const JobDetailsProvider = ({ children }) => {
  const [jobsList, setJobsList] = useState([]);
  const [originalJobsList, setOriginalJobsList] = useState([]); // State for original job list
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
        setOriginalJobsList(jobs); // Store the original job list
        setSelectedJob(jobs[0] || null); // Set the first job as selected by default
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("An error occurred while fetching jobs.");
      }
    };

    fetchJobs();
  }, []);

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
    setJobsList((prevJobsList) =>
      prevJobsList.filter((job) => job.id !== prevJob.id)
    );
    setOriginalJobsList((prevJobsList) =>
      prevJobsList.filter((job) => job.id !== prevJob.id)
    );
  };

  const filterJobs = (titleKeyword, location) => {
    const filteredJobs = originalJobsList.filter((job) => {
      const { jobDetails } = job;

      if (!jobDetails) {
        return false;
      }

      const isTitleMatch = titleKeyword
        ? [
            jobDetails.title,
            jobDetails.companyName,
            jobDetails.location,
            jobDetails.details, // Including details for a broader match
          ]
            .map((field) => (field ? field.toLowerCase().trim() : ""))
            .some((field) => field.includes(titleKeyword.toLowerCase().trim()))
        : true;

      const isLocationMatch = location
        ? jobDetails.location
            .toLowerCase()
            .trim()
            .includes(location.toLowerCase().trim()) ||
          location
            .toLowerCase()
            .trim()
            .includes(jobDetails.location.toLowerCase().trim())
        : true;

      return isTitleMatch && isLocationMatch;
    });

    setJobsList(filteredJobs);
    setSelectedJob(filteredJobs[0] || null);
  };

  const resetFilter = () => {
    setJobsList(originalJobsList); // Reset to original jobs list
    setSelectedJob(originalJobsList[0] || null); // Reset selected job
  };

  return (
    <JobDetailsContext.Provider
      value={{
        jobs: jobsList,
        selectedJob,
        setSelectedJob,
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
