import { createApi } from "@reduxjs/toolkit/query/react";

import type { AuthPayload, AuthResponse } from "@/features/auth/types";
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
    }),
});

export const { useLoginMutation, useRefreshSessionMutation, useRegisterMutation } = authApi;
