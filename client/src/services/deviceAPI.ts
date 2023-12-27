import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deviceAPI = createApi({
  reducerPath: "deviceAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/device/",
  }),
  tagTypes: ["Devices"],
  endpoints: (build) => ({
    fetchAllDevices: build.query({
      query: () => "/get_all_devices",
      providesTags: ["Devices"],
    }),
    createDevice: build.mutation({
      query: (device) => ({
        url: "/create_device",
        method: "POST",
        body: device,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Devices"],
    }),
    deleteDevice: build.mutation({
      query: (slug: string) => ({
        url: `delete_device/${slug}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Devices"],
    }),
  }),
});

export const {
  useFetchAllDevicesQuery,
  useCreateDeviceMutation,
  useDeleteDeviceMutation,
} = deviceAPI;
