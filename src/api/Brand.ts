import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';
import queryString from 'query-string';
import { brandFromDataApi } from './FormData';

export const BrandApi = createApi({
    reducerPath: 'BrandApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders,
        paramsSerializer: function (params: any) {
            return queryString.stringify(params, { arrayFormat: 'index' });
        },
    }),
    tagTypes: ['Brand'],
    endpoints: (builder) => ({
        GetAllBrandApi: builder.query({
            query: (params) => {
                return {
                    url: '/brand/get-all-brand',
                    params
                };
            },
            providesTags: ['Brand'],
        }),
        DeleteBrand: builder.mutation({
            query: (params) => ({
                url: '/brand/delete-brand',
                method: 'DELETE',
                params
            }),
            invalidatesTags: ['Brand'],
        }),
        AddBrand: builder.mutation({
            query: (body) => {
                const formData = brandFromDataApi.createBrand(body);
                return {
                    url: '/brand/create-brand',
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Brand'],
        }),
        EditBrand: builder.mutation({
            query: (body) => {
                const formData = brandFromDataApi.createBrand(body);
                return {
                    url: `/brand/update-brand?id=${body.id}`,
                    method: 'PUT',
                    body: formData,

                };
            },
            invalidatesTags: ['Brand'],
        }),

    }),
});

export const { useGetAllBrandApiQuery, useDeleteBrandMutation, useAddBrandMutation, useEditBrandMutation } = BrandApi;