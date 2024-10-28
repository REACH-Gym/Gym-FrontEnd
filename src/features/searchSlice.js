import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
  },
  reducers: {
    searchR: (state, action) => {
      state.term = action.payload;
    },
    clear: (state) => {
      state.term = "";
    },
  },
});

export default searchSlice.reducer;
export const { searchR, clear } = searchSlice.actions;
