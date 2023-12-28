import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/user",
  }),
  tagTypes: ["users"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    registration: build.mutation({
      query: (user) => ({
        url: "/registration",
        method: "POST",
        body: user,
      }),
    }),
    check: build.query({
      query: (token: string) => ({
        url: "/check",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    fetchAllUsers: build.query({
      query: () => ({
        url: "/get_all_users",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["users"],
    }),
    deleteUser: build.mutation({
      query: (id: number) => ({
        url: `delete_user/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useCheckQuery,
  useFetchAllUsersQuery,
  useDeleteUserMutation,
} = userAPI;
