import { baseApi } from "../../baseApi/baseApi";

export const heroSectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHeroSection: builder.query({
      query: () => ({
        url: "/hero-section",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHeroSectionQuery } = heroSectionApi;
