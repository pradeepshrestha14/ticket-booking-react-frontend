import { AxiosResponse } from 'axios';
import { axiosClient as api } from "./client";
import { Ticket, BookTicketsRequest, BookTicketsResponse, ApiResponse } from '@/types/api';
import { parseApiError } from '@/utils/parseApiError';
import { API_ENDPOINTS, MESSAGES } from '@/constants';

// Get all available tickets
/**
 * Fetches all available tickets from the API.
 * @returns Promise resolving to an array of Ticket objects
 * @throws Error if the API request fails
 */
export const getAllTickets = async (): Promise<Ticket[]> => {
    try {
        const response: AxiosResponse<ApiResponse<Ticket[]>> = await api.get(API_ENDPOINTS.TICKETS);
        return response?.data?.data;
    } catch (error) {
        console.error(MESSAGES.ERROR.FETCH_TICKETS_FAILED, error);
        throw parseApiError(error);
    }
}

// Book tickets
/**
 * Books tickets for a specific tier and quantity.
 * @param bookingData - The booking request containing userId, tier, and quantity
 * @returns Promise resolving to the booking response with confirmation details
 * @throws Error if the booking fails or validation errors occur
 */
export const bookTickets = async (bookingData: BookTicketsRequest): Promise<BookTicketsResponse> => {
    try {
        const response: AxiosResponse<ApiResponse<BookTicketsResponse>> = await api.post(API_ENDPOINTS.BOOK_TICKETS, bookingData);
        return response.data.data;
    } catch (error) {
        console.error(MESSAGES.ERROR.BOOK_TICKETS_FAILED, error);
        throw parseApiError(error);
    }
}
