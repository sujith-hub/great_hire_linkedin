import React, { useEffect, useState } from "react";
import JobsForYou from "./JobsForYou.jsx";
import { JOB_API_END_POINT } from "@/utils/ApiEndPoint.js";
import axios from "axios";
import { setJobs } from "@/redux/jobSlice.js";
import { useDispatch, useSelector } from "react-redux";

const LatestJobs = () => {
  const { jobs } = useSelector((store) => store.jobs);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error before fetching
      const response = await axios.get(`${JOB_API_END_POINT}/get`);

      if (response.data.success) {
        dispatch(setJobs(response.data.jobs));
      } else {
        setError("Failed to fetch jobs.");
      }
    } catch (err) {
      setError("An error occurred while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobs.length === 0) {
      fetchJobs();
    }
  }, [jobs.length]);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="ml-6 text-4xl font-bold">
        <span className="text-[#384ac2]">Latest & Top</span> Job Openings
      </h1>
      {loading ? (
        <p className="ml-6 text-lg">Loading jobs...</p>
      ) : error ? (
        <p className="ml-6 text-lg text-red-500">{error}</p>
      ) : jobs.length > 0 ? (
        <JobsForYou jobs={jobs} />
      ) : (
        <p className="ml-6 text-lg">No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default LatestJobs;
