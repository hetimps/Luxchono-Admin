import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';
import queryString from 'query-string';

export const OrdersApi = createApi({
    reducerPath: 'OrdersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders,
        paramsSerializer: function (params: any) {
            return queryString.stringify(params, { arrayFormat: 'index' });
        },
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        GetAllOrders: builder.query({
            query: (params) => {
                return {
                    url: '/order/get-all-order',
                    method: 'GET',
                    params

                };
            },
            providesTags: ['Orders'],
        }),
        DeleteOrder: builder.mutation({
            query: (params) => ({
                url: '/order/admin-delete-multiple-orde',
                method: 'DELETE',
                params
            }),
            invalidatesTags: ['Orders'],
        }),
        UpdateOrderStatus: builder.mutation({
            query: (body) => {
                return {
                    url: `/order/update-order-status?id=${body.id}&shipped=${body.shipped}&outForDelivery=${body.outForDelivery}&delivered=${body.delivered}
                    &pending=${body.pending}&cancelled=${body.cancelled}&completed=${body.completed}`,
                    method: 'PUT',
                };
            },
            invalidatesTags: ['Orders'],
        })


    }),
});

export const { useGetAllOrdersQuery, useDeleteOrderMutation, useUpdateOrderStatusMutation } = OrdersApi;