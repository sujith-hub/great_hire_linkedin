// src/redux/authSlice.js
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
      state.jobs = action.payload;
    },
    removeJobs: (state) => {
      state.jobs = [];
    },
  },
});

export const {
  setLoading,
  setJobs,
  removeJobs
} = jobSlice.actions;

export default jobSlice.reducer;
