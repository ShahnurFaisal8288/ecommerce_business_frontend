// import { baseApi } from "../../baseApi/baseApi";
import { baseApi } from "../../baseApi/baseApi.js";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
