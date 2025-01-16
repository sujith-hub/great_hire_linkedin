import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    company: null, // Initial state is null
    searchedQuery: "", // Added searchedQuery field
  },
  reducers: {
    // Existing actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addCompany: (state, action) => {
      state.company = action.payload;
    },
    removeCompany: (state) => {
      state.company = null;
    },
    // Remove user from company by user ID
    removeUserFromCompany: (state, action) => {
      if (state.company) {
        state.company.userId = state.company.userId.filter(
          (user) => user.user.toString() !== action.payload
        );
      }
    },
  },
});

export const { setLoading, addCompany, removeCompany, removeUserFromCompany } = companySlice.actions;

export default companySlice.reducer;
