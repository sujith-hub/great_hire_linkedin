import { createSlice } from "@reduxjs/toolkit";

const jobPlanSlice = createSlice({
  name: "jobPlan",
  initialState: {
    jobPlan: null, // Initial state is null
  },
  reducers: {
    addJobPlan: (state, action) => {
      state.jobPlan = action.payload;
    },
    removeJobPlan: (state) => {
      state.jobPlan = null;
    },
  },
});

export const {
  addJobPlan,
  removeJobPlan,
} = jobPlanSlice.actions;

export default jobPlanSlice.reducer;
