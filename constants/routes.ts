const ROUTES = {
    HOME: "/",
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        FORGOT_PASSWORD: "/auth/forgot-password",
    },
    LEGAL: {
        TOS: "/legal/terms-of-service",
        PRIVACY_POLICY: "/legal/privacy-policy",
    },
} as const;

export default ROUTES;
