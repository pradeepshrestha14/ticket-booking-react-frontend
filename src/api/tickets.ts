import { AxiosResponse } from 'axios';
import { axiosClient as api } from "./client";
import { Ticket, BookTicketsRequest, BookTicketsResponse, ApiResponse } from '@/types/api';
import { parseApiError } from '@/utils/parseApiError';
import { API_ENDPOINTS, MESSAGES } from '@/constants';

// Get all available tickets
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
export const bookTickets = async (bookingData: BookTicketsRequest): Promise<BookTicketsResponse> => {
    try {
        const response: AxiosResponse<ApiResponse<BookTicketsResponse>> = await api.post(API_ENDPOINTS.BOOK_TICKETS, bookingData);
        return response.data.data;
    } catch (error) {
        console.error(MESSAGES.ERROR.BOOK_TICKETS_FAILED, error);
        throw parseApiError(error);
    }
}
