import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deviceAPI = createApi({
  reducerPath: "deviceAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/device/",
  }),
  tagTypes: ["Devices", "Rating"],
  endpoints: (build) => ({
    fetchAllDevices: build.query({
      query: ({ limit = 12, page = 1, brandId = null, typeId = null }) => ({
        url: `get_all_devices?limit=${limit}&page=${page}&brandId=${
          brandId !== null ? brandId : ""
        }&typeId=${typeId !== null ? typeId : ""}`,
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
        method: "POST",
        body: { name, price, description, sale },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Devices"],
    }),
    fetchOneDevice: build.query({
      query: (slug: string) => ({
        url: `get_one_device/${slug}`,
        method: "GET",
      }),
      providesTags: ["Rating"],
    }),
    addRating: build.mutation({
      query: ({ slug, rating }) => ({
        url: `add_rating/${slug}`,
        method: "POST",
        body: { rating },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Rating"],
    }),
  }),
});

export const {
  useFetchAllDevicesQuery,
  useCreateDeviceMutation,
  useDeleteDeviceMutation,
  useChangeDeviceMutation,
  useFetchOneDeviceQuery,
  useAddRatingMutation,
} = deviceAPI;
