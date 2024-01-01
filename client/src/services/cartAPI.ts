import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartAPI = createApi({
  reducerPath: "cartAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/cart/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Cart"],
  endpoints: (build) => ({
    addDeviceToCart: build.mutation({
      query: (deviceId: number, amount = 1) => ({
        url: "add_device_to_cart",
        method: "POST",
        body: { deviceId, amount },
      }),
      invalidatesTags: ["Cart"],
    }),
    fetchCartAmount: build.query({
      query: () => ({
        url: "get_cart_amount",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    fetchCart: build.query({
      query: () => "/get_cart",
      providesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddDeviceToCartMutation,
  useLazyFetchCartAmountQuery,
  useFetchCartQuery,
} = cartAPI;
