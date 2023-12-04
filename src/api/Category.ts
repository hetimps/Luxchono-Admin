import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const CategoryApi = createApi({
    reducerPath: 'CategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders
    }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        GetAllCategory: builder.query({
            query: () => {
                return {
                    url: '/category/get-all-category',
                };
            },
            providesTags: ["Category"],
        }),

    }),
});

export const {useGetAllCategoryQuery } = CategoryApi;