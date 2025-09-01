export interface AuthPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    data: {
        token: string;
    };
}