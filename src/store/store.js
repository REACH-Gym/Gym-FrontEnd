import { configureStore } from "@reduxjs/toolkit";
import { apis } from "../features/api";
import receiptSlice from "../features/receiptSlice";
import searchSlice from "../features/searchSlice";

const store = configureStore({
  reducer: {
    [apis.reducerPath]: apis.reducer,
    receipt: receiptSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.middleware), // Return the middleware array
});

export default store;
