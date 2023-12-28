import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deviceAPI = createApi({
  reducerPath: "deviceAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/device/",
  }),
  tagTypes: ["Devices"],
  endpoints: (build) => ({
    fetchAllDevices: build.query({
      query: ({ limit = 12, page = 1, brandId = "", typeId = "" }) => ({
        url: `get_all_devices?limit=${limit}&page=${page}&brandId=${brandId}&typeId=${typeId}`,
        method: "GET",
      }),
      providesTags: ["Devices"],
    }),
    createDevice: build.mutation({
      query: (device) => ({
        url: "create_device",
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
    changeDevice: build.mutation({
      query: ({ slug, name, price, description, sale }) => ({
        url: `change_device/${slug}`,
        method: "PUT",
        body: { name, price, description, sale },
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
  useChangeDeviceMutation,
} = deviceAPI;
