import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthResponse } from "@/features/auth/types";

interface AuthState {
    accessToken: string | null;
}

const initialState: AuthState = { accessToken: null };

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
});

export const { setCredentials, resetCredentials } = authSlice.actions;
export default authSlice.reducer;