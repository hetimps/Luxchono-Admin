import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";
import queryString from 'query-string';
import { OfferFromDataApi } from "./FormData";


export const OfferApi = createApi({
    reducerPath: 'OfferApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders,
        paramsSerializer: function (params: any) {
            return queryString.stringify(params, { arrayFormat: 'index' });
        },

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
        AddOffer: builder.mutation({
            query: (body) => {
                const formData = OfferFromDataApi.createOffer(body);
                return {
                    url: "/offer/create-offer",
                    method: "POST",
                    body: formData
                };
            },
            invalidatesTags: ["Offer"],
        }),
        DeleteOffer: builder.mutation({
            query: (params) => ({
                url: `/offer/delete-offer`,
                method: 'DELETE',
                params
            }),
            invalidatesTags: ["Offer"],
        }),
        EditOffer: builder.mutation({
            query: (body) => {
                const formData = OfferFromDataApi.createOffer(body);
                return {
                    url: `/offer/update-offer?id=${body.id}`,
                    method: 'PUT',
                    body: formData,

                };
            },
            invalidatesTags: ["Offer"],
        }),
    }),
});

export const { useGetAllOfferQuery, useAddOfferMutation ,useDeleteOfferMutation ,useEditOfferMutation } = OfferApi;