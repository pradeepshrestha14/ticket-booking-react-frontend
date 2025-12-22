export interface ApiErrorDetail {
    path: string;
    message: string;
}

export interface ApiError {
    name: string;
    code: string;
    message: string;
    status: number;
    details?: ApiErrorDetail[];
}

export interface ApiErrorResponse {
    success: false;
    error: ApiError;
}
