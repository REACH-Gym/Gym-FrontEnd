import { createSlice } from "@reduxjs/toolkit";

const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    status: false,
    id: 0,
  },
  reducers: {
    setReceipt: (state, action) => {
      state.status = action.payload;
    },
    setReceiptId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export default receiptSlice.reducer;
export const { setReceipt, setReceiptId } = receiptSlice.actions;
