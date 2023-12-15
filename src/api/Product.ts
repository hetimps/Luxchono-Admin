import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";
import queryString from 'query-string';
import { productFromDatApi } from "./FormData";

export const ProductApi = createApi({
    reducerPath: 'ProductApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders,
        paramsSerializer: function (params: any) {
            return queryString.stringify(params, { arrayFormat: 'index' });
        },
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        GetAllProduct: builder.query({
            query: (params) => {
                console.log(params, "param")
                return {
                    url: '/product/get-all-product',
                    params
                }
            },
            providesTags: ["Product"],
        }),
        DeleteProduct: builder.mutation({
            query: (params) => ({
                url: `/product/delete-product`,
                method: 'DELETE',
                params
            }),
            invalidatesTags: ["Product"],
        }),

        AddProduct: builder.mutation({
            query: (body) => {

                console.log(body, "body--")
                const formData = productFromDatApi.createProduct(body);
                return {
                    url: "/product/create-product",
                    method: "POST",
                    body: formData
                };
            },
            invalidatesTags: ["Product"],
        }),
        EditProduct: builder.mutation({
            query: (body) => {
                const formData = productFromDatApi.createProduct(body);
                return {
                    url: `/product/update-product/?id=${body?.id}`,
                    method: 'PUT',
                    body: formData,

                };
            },
            invalidatesTags: ["Product"],
        }),
    }),
});

export const { useGetAllProductQuery, useDeleteProductMutation, useAddProductMutation, useEditProductMutation } = ProductApi;