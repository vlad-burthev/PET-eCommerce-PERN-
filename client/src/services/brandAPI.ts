import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandAPI = createApi({
  reducerPath: "brandAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/brand/",
  }),
  tagTypes: ["Brands"],
  endpoints: (build) => ({
    fetchAllBrands: build.query({
      query: () => "get_all_brands",
      providesTags: ["Brands"],
    }),
    createBrand: build.mutation({
      query: (name: string) => ({
        url: "create_brand",
        method: "POST",
        body: { name: name },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: build.mutation({
      query: (id: number) => ({
        url: `delete_brand/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useFetchAllBrandsQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
} = brandAPI;
