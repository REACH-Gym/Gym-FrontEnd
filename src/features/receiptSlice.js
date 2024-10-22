import { createSlice } from "@reduxjs/toolkit";

const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    status: false,
    paid: 0,
    id: "",
  },
  reducers: {
    setReceipt: (state, action) => {
      state.status = action.payload;
    },
    setReceiptPaid: (state, action) => {
      state.paid = action.payload;
    },
    setReceiptId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export default receiptSlice.reducer;
export const { setReceipt, setReceiptPaid, setReceiptId } =
  receiptSlice.actions;
