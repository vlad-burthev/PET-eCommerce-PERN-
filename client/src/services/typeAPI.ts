import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const typeAPI = createApi({
  reducerPath: "typeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/type/",
  }),
  tagTypes: ["Types"],
  endpoints: (build) => ({
    fetchAllTypes: build.query({
      query: () => "get_all_types",
      providesTags: ["Types"],
    }),
    createType: build.mutation({
      query: (name: string) => ({
        url: "create_type",
        method: "POST",
        body: { name: name },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Types"],
    }),
    deleteType: build.mutation({
      query: (id: number) => ({
        url: `delete_type/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Types"],
    }),
  }),
});

export const {
  useFetchAllTypesQuery,
  useCreateTypeMutation,
  useDeleteTypeMutation,
} = typeAPI;
