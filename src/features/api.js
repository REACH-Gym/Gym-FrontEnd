import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_DOMAIN}/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", localStorage.getItem("access"));
      return headers;
    },
  })(args, api, extraOptions);

  // If the response is 401 (Unauthorized), try to refresh the token
  if (result?.error?.status === 401) {
    const refreshToken = localStorage.getItem("refresh");

    // Call the refresh token endpoint to get a new access token
    const refreshResult = await fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_DOMAIN}/`,
      method: "POST",
      headers: {
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
        baseUrl: `${process.env.REACT_APP_DOMAIN}/`,
        prepareHeaders: (headers) => {
          headers.set("Authorization", refreshResult.data.data.access_token);
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
    userData: builder.query({
      query: () => `current-employee`,
    }),
    getAllMembers: builder.query({
      query: (params) => `members${params}`,
    }),
    editMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `members/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getEmployees: builder.query({
      query: (params) => `employee${params}`,
    }),
    postEmployee: builder.mutation({
      query: (data) => ({
        url: "employee",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    patchEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `employee/${id}`,
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
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
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteMeasurement: builder.mutation({
      query: (id) => ({
        url: `members/measurements/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
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
        headers: {
          "Content-Type": "application/json",
        },
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
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editSession: builder.mutation({
      query: ({ id, data }) => ({
        url: `sessions/${id}`,
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editMemberSessionStartDate: builder.mutation({
      query: ({ id, data }) => ({
        url: `members/sessions/${id}/update-start-date/`,
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editMemberMembershipStartDate: builder.mutation({
      query: ({ id, data }) => ({
        url: `members/memberships/${id}/update-start-date/`,
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    freezeMemberSession: builder.mutation({
      query: ({ id, data }) => ({
        url: `members/sessions/${id}/freeze/`,
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    freezeMemberMembership: builder.mutation({
      query: ({ id, data }) => ({
        url: `members/memberships/${id}/freeze/`,
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    unFreezeMemberSession: builder.mutation({
      query: (id) => ({
        url: `members/sessions/${id}/unfreeze/`,
        method: "PATCH",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    unFreezeMemberMembership: builder.mutation({
      query: (id) => ({
        url: `members/memberships/${id}/unfreeze/`,
        method: "PATCH",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    patchSession: builder.mutation({
      query: ({ id, data }) => ({
        url: `sessions/${id}/`,
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    postSchedule: builder.mutation({
      query: (data) => ({
        url: "schedules",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
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
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getCoupons: builder.query({
      query: (params) => `coupons/active_coupons/${params}`,
    }),
    getAllCoupons: builder.query({
      query: (params) => `coupons/${params}`,
    }),
    postCoupon: builder.mutation({
      query: (data) => ({
        url: "coupons/",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `coupons/${id}/`,
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
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
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getReciet: builder.query({
      query: (id) => `session-receipt/${id}`,
    }),
    getMembershipReciet: builder.query({
      query: (id) => `membership-receipt/${id}`,
    }),
    getOffer: builder.query({
      query: (query) => `offer/${query}`,
    }),
    editOffer: builder.mutation({
      query: (data) => ({
        url: `offer/`,
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMemberOffer: builder.query({
      query: (query) => `offer/members/${query}`,
    }),
    markOfferAsFinished: builder.mutation({
      query: (id) => ({
        url: `offer/members/${id}/mark-as-finished`,
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetAllMembersQuery,
  useGetAllMembersAtOnceQuery,
  useEditMemberMutation,
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
  useGetAllCouponsQuery,
  useUserDataQuery,
  useEditMemberSessionStartDateMutation,
  useFreezeMemberSessionMutation,
  useUnFreezeMemberSessionMutation,
  useFreezeMemberMembershipMutation,
  useUnFreezeMemberMembershipMutation,
  useEditMemberMembershipStartDateMutation,
  useGetOfferQuery,
  useGetMemberOfferQuery,
  useMarkOfferAsFinishedMutation,
  useEditOfferMutation,
} = apis;
