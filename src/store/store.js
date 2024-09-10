import { configureStore } from "@reduxjs/toolkit";
import { apis } from "../features/api";

const store = configureStore({
  reducer: {
    [apis.reducerPath]: apis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.middleware), // Return the middleware array
});

export default store;
