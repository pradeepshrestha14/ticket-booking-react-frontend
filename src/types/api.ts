export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: {
        code: string;
        message: string;
    };
}

// Interface for API ticket data
// Frontend is completely unaware of specific tier types - accepts any tier from backend
export interface Ticket {
    id: number;
    tier: string; // Backend controls tier names completely (used for API calls)
    label: string; // User-friendly display name for the ticket tier
    price: number;
    totalQuantity: number;
    availableQuantity: number;
}

export interface BookTicketsRequest {
    userId: string;
    tier: string; // Allow any string for flexibility
    quantity: number;
}

export interface BookTicketsResponse {
    tier: string;
    bookedQuantity: number;
    remainingQuantity: number;
    totalAmount: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface ApiError {
    message: string;
    code?: string;
}