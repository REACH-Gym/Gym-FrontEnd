import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await fetchBaseQuery({
    baseUrl: "https://gym-backend-production-65cc.up.railway.app/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", localStorage.getItem("access"));
      headers.set("Content-Type", "application/json");
      return headers;
    },
  })(args, api, extraOptions);

  // If the response is 401 (Unauthorized), try to refresh the token
  if (result?.error?.status === 401) {
    const refreshToken = localStorage.getItem("refresh");

    // Call the refresh token endpoint to get a new access token
    const refreshResult = await fetchBaseQuery({
      baseUrl: "https://gym-backend-production-65cc.up.railway.app/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: refreshToken,
      },
    })({ url: "auth/refresh-token" }, api, extraOptions);

    if (refreshResult?.data) {
      // Save the new access token
      console.log(refreshResult.data);
      localStorage.setItem("access", refreshResult.data.data.access_token);
      localStorage.setItem("refresh", refreshResult.data.data.refresh_token);

      // Retry the original request with the new access token
      result = await fetchBaseQuery({
        baseUrl: "https://gym-backend-production-65cc.up.railway.app/",
        prepareHeaders: (headers) => {
          headers.set("Authorization", refreshResult.data.data.access_token);
          headers.set("Content-Type", "application/json");
          return headers;
        },
      })(args, api, extraOptions);
    } else {
      // If refreshing the token fails, log the user out or handle the failure
      // Optionally, you could dispatch an action to clear auth state
      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    }
  }

  return result;
};

export const apis = createApi({
  reducerPath: "apis",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllMembers: builder.query({
      query: (params) => `members${params}`,
    }),
    getEmployees: builder.query({
      query: (params) => `employee${params}`,
    }),
    postEmployee: builder.mutation({
      query: (data) => ({
        url: "employee",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    patchEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `employee/${id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    }),
    getAllMembersAtOnce: builder.query({
      query: () => `members?paginate=false&filter{is_active}=true`,
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
    deleteMeasurement: builder.mutation({
      query: (id) => ({
        url: `members/measurements/${id}`,
        method: "DELETE",
      }),
    }),
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    getGroupsMembers: builder.query({
      query: (params) => `members/sessions/${params}`,
    }),
    postSession: builder.mutation({
      query: (data) => ({
        url: "sessions",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    getSessions: builder.query({
      query: (params) => `sessions/${params}`,
    }),
    getSessionsWithSchedules: builder.query({
      query: (params) => `sessions-with-schedules/${params}`,
    }),
    postSessionMember: builder.mutation({
      query: (data) => ({
        url: "members/sessions/",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    editSession: builder.mutation({
      query: ({ id, data }) => ({
        url: `sessions/${id}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    patchSession: builder.mutation({
      query: ({ id, data }) => ({
        url: `sessions/${id}/`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    }),
    postSchedule: builder.mutation({
      query: (data) => ({
        url: "schedules",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    getSchedules: builder.query({
      query: (params) => `schedules/${params}`,
    }),
    patchSchedule: builder.mutation({
      query: ({ id, data }) => ({
        url: `schedules/${id}/`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    }),
    getCoupons: builder.query({
      query: (params) => `coupons/active_coupons/${params}`,
    }),
    postCoupon: builder.mutation({
      query: (data) => ({
        url: "coupons/",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    editCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `coupons/${id}/`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    }),
    search: builder.query({
      query: (data) => `${data}`,
    }),
    sendDetails: builder.mutation({
      query: (data) => ({
        url: "whatsapp/send-details/",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    getReciet: builder.query({
      query: (id) => `session-receipt/${id}`,
    }),
    getMembershipReciet: builder.query({
      query: (id) => `membership-receipt/${id}`,
    }),
  }),
});
export const {
  useGetAllMembersQuery,
  useGetAllMembersAtOnceQuery,
  useGetMeasurementsQuery,
  useLoginAdminMutation,
  useAddMeasurementsMutation,
  useGetGroupsMembersQuery,
  usePostSessionMutation,
  useGetSessionsQuery,
  usePostScheduleMutation,
  useGetEmployeesQuery,
  useLazyGetSchedulesQuery,
  useLazySearchQuery,
  usePostSessionMemberMutation,
  useDeleteMeasurementMutation,
  useEditSessionMutation,
  usePatchSessionMutation,
  usePatchScheduleMutation,
  useGetSessionsWithSchedulesQuery,
  usePostEmployeeMutation,
  usePatchEmployeeMutation,
  useGetCouponsQuery,
  usePostCouponMutation,
  useSendDetailsMutation,
  useEditCouponMutation,
  useLazyGetRecietQuery,
  useLazyGetMembershipRecietQuery,
} = apis;
