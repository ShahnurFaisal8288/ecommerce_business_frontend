import { baseApi } from "../../baseApi/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
