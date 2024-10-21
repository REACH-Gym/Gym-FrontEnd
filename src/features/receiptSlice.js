import { createSlice } from "@reduxjs/toolkit";

const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    status: false,
  },
  reducers: {
    setReceipt: (state, action) => {
      state.status = action.payload;
    },
  },
});

export default receiptSlice.reducer;
export const { setReceipt } = receiptSlice.actions;
