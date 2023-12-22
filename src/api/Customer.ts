import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";
import queryString from 'query-string';


export const CustomerApi = createApi({
    reducerPath: 'CustomerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders,

    }),
    tagTypes: ["Customer"],
    endpoints: (builder) => ({
        GetAllCustomer: builder.query({
            query: (params) => {
                return {
                    url: '/user/get-all-user',
                    params
                };
            },
            providesTags: ["Customer"],
        }),



    }),
});

export const { useGetAllCustomerQuery, } = CustomerApi;