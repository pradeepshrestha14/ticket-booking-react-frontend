import { AxiosResponse } from 'axios';
import { axiosClient as api } from "./client";
import { Ticket, BookTicketsRequest, BookTicketsResponse, ApiResponse } from '../types/api';
import { parseApiError } from '../utils/parseApiError'; // optional utility

// Get all available tickets
export const getAllTickets = async (): Promise<Ticket[]> => {
    try {
        const response: AxiosResponse<ApiResponse<Ticket[]>> = await api.get('/api/tickets');
        return response?.data?.data;
    } catch (error) {
        console.error('Failed to fetch tickets:', error);
        throw parseApiError(error); // consistent error handling
    }
}

// Book tickets
export const bookTickets = async (bookingData: BookTicketsRequest): Promise<BookTicketsResponse> => {
    try {
        const response: AxiosResponse<ApiResponse<BookTicketsResponse>> = await api.post('/api/tickets/book', bookingData);
        return response.data.data;
    } catch (error) {
        console.error('Failed to book tickets:', error);
        throw parseApiError(error); // consistent error handling
    }
}
