export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: {
        code: string;
        message: string;
    };
}

export type TicketTier = "VIP" | "FRONT_ROW" | "GA";

export interface Ticket {
    tier: TicketTier;
    price: number;
    totalQuantity: number;
    availableQuantity: number;
}

export interface BookTicketsRequest {
    userId: string;
    tier: TicketTier;
    quantity: number;
}

export interface BookTicketsResponse {
    tier: TicketTier;
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