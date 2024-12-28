import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    company: null, // Initial state is an empty array
    searchedQuery: "", // Added searchedQuery field
  },
  reducers: {
    // Existing actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Updated addCompany to handle array state
    addCompany: (state, action) => {
      state.company = action.payload;
    },
    removeCompany: (state) => {
      state.company = null;
    },
    // New action for searchedQuery
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const { setLoading, addCompany, removeCompany, setSearchedQuery } = companySlice.actions;

export default companySlice.reducer;
