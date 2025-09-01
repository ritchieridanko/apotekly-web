import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { IRootState } from "@/stores";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as IRootState).auth.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export default baseQuery;
