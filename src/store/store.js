import { configureStore } from "@reduxjs/toolkit";
import { apis } from "../features/api";
import receiptSlice from "../features/receiptSlice";

const store = configureStore({
  reducer: {
    [apis.reducerPath]: apis.reducer,
    receipt: receiptSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.middleware), // Return the middleware array
});

export default store;
