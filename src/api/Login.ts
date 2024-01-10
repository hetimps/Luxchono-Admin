import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const LoginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api'
    }),
    endpoints: (builder: any) => ({
        login: builder.mutation({
            query: (body: any) => ({
                url: '/admin/login',
                method: 'post',
                body,
            }),
        }),
        Register: builder.mutation({
            query: (body: any) => ({
                url: '/admin/register',
                method: 'post',
                body,
            }),
        }),
        VerifyOtp: builder.mutation({
            query: (body: any) => ({
                url: '/admin/verifyAdmin',
                method: 'post',
                body,
            }),
        }),
        ResendOtp: builder.mutation({
            query: (body: any) => ({
                url: '/admin/resend-email',
                method: 'post',
                body,
            }),
        }),
        ForgotPassword: builder.mutation({
            query: (body: any) => ({
                url: '/admin/forgot-password-email',
                method: 'post',
                body,
            }),
        }),
        ResetPassword: builder.mutation({
            query: ({ id, password, confirmPassword }: any) => ({
                url: `/admin/reset-password/${id ? id : ''}`,
                method: 'post',
                body: { password, confirmPassword },
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyOtpMutation, useResendOtpMutation, useForgotPasswordMutation,useResetPasswordMutation } = LoginApi;





