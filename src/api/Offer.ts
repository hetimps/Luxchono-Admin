import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";
import queryString from 'query-string';


export const OfferApi = createApi({
    reducerPath: 'OfferApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders,

    }),
    tagTypes: ["Offer"],
    endpoints: (builder) => ({
        GetAllOffer: builder.query({
            query: (params) => {
                return {
                    url: '/offer/get-all-offer',
                    params
                };
            },
            providesTags: ["Offer"],
        }),



    }),
});

export const { useGetAllOfferQuery} = OfferApi;