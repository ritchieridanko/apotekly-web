import { type Action, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthResponse } from "@/features/auth/types";

interface AuthState {
    accessToken: string | null;
    isLoading: boolean;
}

const initialState: AuthState = { accessToken: null, isLoading: false };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            state.accessToken = action.payload.data.token
        },
        resetCredentials: (state) => {
            state.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action: Action) =>
                    action.type.startsWith("authApi/") &&
                    action.type.endsWith("/pending"),
                (state) => {
                    state.isLoading = true;
                },
            )
            .addMatcher(
                (action: Action) =>
                    action.type.startsWith("authApi/") &&
                    (
                        action.type.endsWith("/fulfilled") ||
                        action.type.endsWith("/rejected")
                    ),
                (state) => {
                    state.isLoading = false;
                },
            );
    },
});

export const { setCredentials, resetCredentials } = authSlice.actions;
export default authSlice.reducer;