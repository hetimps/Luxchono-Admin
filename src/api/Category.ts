import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';
import queryString from 'query-string';
import { categoryFromDataApi } from './FormData';

export const CategoryApi = createApi({
    reducerPath: 'CategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders,
        paramsSerializer: function (params: any) {
            return queryString.stringify(params, { arrayFormat: 'index' });
        },
    }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        GetAllCategory: builder.query({
            query: (params) => {
                return {
                    url: '/category/get-all-category',
                    params
                };
            },
            providesTags: ['Category'],
        }),
        DeleteCategory: builder.mutation({
            query: (params) => ({
                url: '/category/delete-category',
                method: 'DELETE',
                params
            }),
            invalidatesTags: ['Category'],
        }),
        AddCategory: builder.mutation({
            query: (body) => {
                const formData = categoryFromDataApi.createCategory(body);
                return {
                    url: '/category/create-category',
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Category'],
        }),
        EditCategory: builder.mutation({
            query: (body) => {
                const formData = categoryFromDataApi.createCategory(body);
                return {
                    url: `/category/update-category?id=${body.id}`,
                    method: 'PUT',
                    body: formData,

                };
            },
            invalidatesTags: ['Category'],
        }),
    }),
});

export const { useGetAllCategoryQuery, useDeleteCategoryMutation, useAddCategoryMutation, useEditCategoryMutation } = CategoryApi;