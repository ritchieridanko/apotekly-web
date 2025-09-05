export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    token: string;
    new_password: string;
}

export interface TokenValidationPayload {
    token: string;
}

export interface TokenValidationResponse {
    message: string;
    data: {
        is_valid: boolean;
    };
}