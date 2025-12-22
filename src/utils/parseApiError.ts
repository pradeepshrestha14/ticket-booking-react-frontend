
import { AxiosError } from "axios";
import { ApiError, ApiErrorResponse } from "../types/api-error";

/*
* Utility function to parse API errors from Axios responses.
*/
export function parseApiError(error: unknown): Error {
    if (
        typeof error === "object" &&
        error !== null &&
        "isAxiosError" in error
    ) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        const apiError = axiosError.response?.data?.error as ApiError;

        console.error("Parsed API Error:", apiError);

        if (apiError) {
            // Handle specific error cases
            if (apiError.code === "PAYMENT_FAILED") {
                return new Error("Your payment could not be completed.");
            }
            else if (apiError.status === 400) {
                return new Error(apiError.message || 'Invalid booking request');
            } else if (apiError.status === 422) {
                return new Error('Not enough tickets available');
            } else if (apiError.status >= 500) {
                return new Error('Server error. Please try again later.');
            }

            return new Error(apiError.message);
        }
    }

    return new Error("Something went wrong. Please try again.");
}
