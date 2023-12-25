import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/user",
  }),
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
  }),
});

export const { useLoginMutation, useRegistrationMutation, useCheckQuery } =
  userAPI;
