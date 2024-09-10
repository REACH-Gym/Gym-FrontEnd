import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apis = createApi({
  reducerPath: "apis",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gym-backend-production-65cc.up.railway.app/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", localStorage.getItem("access"));
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMeasurements: builder.query({
      query: () => "members/measurements",
    }),
    addMeasurements: builder.mutation({
      query: () => ({
        url: "members/measurements",
        method: "POST",
        body: JSON.stringify({ user_id: 14, height: 170, month: "2024-9-11" }),
      }),
    }),
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const {
  useGetMeasurementsQuery,
  useLoginAdminMutation,
  useAddMeasurementsMutation,
} = apis;
