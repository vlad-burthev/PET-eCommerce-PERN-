import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const typeAPI = createApi({
  reducerPath: "typeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/type/",
  }),
  endpoints: (build) => ({
    fetchAllTypes: build.query({
      query: () => "get_all_types",
    }),
  }),
});

export const { useFetchAllTypesQuery } = typeAPI;
