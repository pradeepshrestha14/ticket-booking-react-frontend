// Component-specific types and interfaces

export interface TicketCardProps {
    ticket: import("@/types/api").Ticket;
    quantity: number;
    isBooking: boolean;
    successMessage: string | null;
    onQuantityChange: (tier: import("@/types/api").TicketTier, value: number) => void;
    onBook: (tier: import("@/types/api").TicketTier) => void;
}

export interface HomePageProps {
    userId: string;
}