import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const BrandApi = createApi({
    reducerPath: 'BrandApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders
    }),
    tagTypes: ["Brand"],
    endpoints: (builder) => ({
        GetAllBrandApi: builder.query({
            query: () => {
                return {
                    url: '/brand/get-all-brand',
                };
            },
            providesTags: ["Brand"],
        }),

    }),
});

export const { useGetAllBrandApiQuery} = BrandApi;