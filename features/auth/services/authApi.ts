import { createApi } from "@reduxjs/toolkit/query/react";

import type {
    AuthPayload,
    AuthResponse,
    ForgotPasswordPayload,
    ResetPasswordPayload,
    TokenValidationPayload,
    TokenValidationResponse,
} from "@/features/auth/types";
import { baseQuery } from "@/libs/rtk";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, AuthPayload, APIErrorResponse>({
            query: (body: AuthPayload) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
        register: builder.mutation<AuthResponse, AuthPayload, APIErrorResponse>({
            query: (body: AuthPayload) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
        }),
        refreshSession: builder.mutation<AuthResponse, void, APIErrorResponse>({
            query: () => ({
                url: "/auth/refresh-session",
                method: "POST",
            }),
        }),
        forgotPassword: builder.mutation<APIGenericResponse, ForgotPasswordPayload, APIErrorResponse>({
            query: (body: ForgotPasswordPayload) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body,
            }),
        }),
        resetPassword: builder.mutation<APIGenericResponse, ResetPasswordPayload, APIErrorResponse>({
            query: (body: ResetPasswordPayload) => ({
                url: "/auth/reset-password/confirm",
                method: "POST",
                body,
            }),
        }),
        validateResetToken: builder.mutation<TokenValidationResponse, TokenValidationPayload, APIErrorResponse>({
            query: (body: TokenValidationPayload) => ({
                url: "/auth/reset-password/validate",
                method: "POST",
                body,
            }),
        })
    }),
});

export const {
    useForgotPasswordMutation,
    useLoginMutation,
    useRefreshSessionMutation,
    useRegisterMutation,
    useResetPasswordMutation,
    useValidateResetTokenMutation,
} = authApi;
