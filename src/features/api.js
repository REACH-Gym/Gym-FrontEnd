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
    getAllMembers: builder.query({
      query: () => `members`,
    }),
    getAllMembersAtOnce: builder.query({
      query: () => `members?paginate=false`,
    }),
    getMeasurements: builder.query({
      query: ({ page, page_size }) =>
        `members/measurements?page=${page}&page_size=${page_size}`,
    }),
    addMeasurements: builder.mutation({
      query: (data) => ({
        url: "members/measurements",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    getMembersSessions: builder.query({
      query: (params) => `members/sessions/${params}`,
    }),
    postSession: builder.mutation({
      query: (data) => ({
        url: "sessions",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    getSchedules: builder.query({
      query: (params) => `schedules${params}`,
    }),
    postSchedule: builder.mutation({
      query: (data) => ({
        url: "schedules",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
  }),
});
export const {
  useGetAllMembersQuery,
  useGetAllMembersAtOnceQuery,
  useGetMeasurementsQuery,
  useLoginAdminMutation,
  useAddMeasurementsMutation,
  useGetMembersSessionsQuery,
  usePostSessionMutation,
  useGetSchedulesQuery,
  usePostScheduleMutation,
} = apis;
