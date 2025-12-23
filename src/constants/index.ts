// API Constants
export const API_ENDPOINTS = {
    TICKETS: '/api/tickets',
    BOOK_TICKETS: '/api/tickets/book',
} as const;

// UI Messages and Texts
export const MESSAGES = {
    SUCCESS: {
        TICKETS_BOOKED: 'Tickets booked successfully!',
        BOOKING_SUCCESS: (quantity: number, tier: string, total: number) =>
            `Successfully booked ${quantity} ${tier} ticket(s)! Total: $${total}`,
    },
    ERROR: {
        FETCH_TICKETS_FAILED: 'Failed to fetch tickets',
        BOOK_TICKETS_FAILED: 'Failed to book tickets',
    },
    LOADING: {
        LOADING_TICKETS: 'Loading tickets...',
        BOOKING: 'Booking...',
    },
} as const;

// UI Texts
export const TEXTS = {
    PAGE_TITLE: 'Available Tickets',
    PAGE_DESCRIPTION: 'Book your tickets for the upcoming event',
    USER_ID_LABEL: 'Your User ID:',
    BOOK_BUTTON: (quantity: number) => `Book ${quantity} Tickets`,
    SOLD_OUT: 'Sold Out',
} as const;

// Other Constants
export const USER_ID = 'user-1766388127080';