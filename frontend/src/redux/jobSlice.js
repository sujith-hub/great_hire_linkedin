import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    loading: false,
    jobs: [],
    searchedQuery: "", // Added searchedQuery field
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setJobs: (state, action) => {
      state.jobs.push(action.payload);
    },
    removeJobs: (state) => {
      state.jobs = [];
    },
    // Remove all jobs where recruiter id matches
    removeJobsByRecruiterId: (state, action) => {
      state.jobs = state.jobs.filter(
        (job) => job.created_by.toString() !== action.payload
      );
    },
  },
});

export const { setLoading, setJobs, removeJobs, removeJobsByRecruiterId } = jobSlice.actions;

export default jobSlice.reducer;
