interface APIErrorResponse {
    message: string;
}

interface RTKErrorResponse {
    status?: number;
    data?: APIErrorResponse;
}