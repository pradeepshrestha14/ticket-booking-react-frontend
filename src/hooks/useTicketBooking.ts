import { useState, useCallback, useEffect } from "react";
import { useBookTickets } from "./useBookTickets";
import { BookTicketsResponse, Ticket } from "@/types/api";
import { MESSAGES } from "@/constants";

interface UseTicketBookingProps {
    userId: string;
    tickets: Ticket[]; // Add tickets prop for dynamic initialization
}

/**
 * Custom hook for managing ticket booking state and logic.
 * @param userId - The ID of the user booking tickets.
 * @param tickets - Array of available tickets for dynamic quantity initialization.
 * @returns Object containing state and handlers for ticket booking.
 */
export const useTicketBooking = ({ userId, tickets }: UseTicketBookingProps) => {
    // Initialize quantities dynamically based on available tickets
    const initializeQuantities = useCallback(() => {
        const quantities: Record<string, number> = {};
        tickets.forEach(ticket => {
            // Since frontend trusts backend data, accept all tiers
            quantities[ticket.tier] = 0;
        });
        return quantities;
    }, [tickets]);

    const [quantities, setQuantities] = useState<Record<string, number>>(initializeQuantities);
    const [successMessages, setSuccessMessages] = useState<Record<string, string | null>>({});
    const [bookingTier, setBookingTier] = useState<string | null>(null);

    // Update quantities when tickets change
    useEffect(() => {
        setQuantities(initializeQuantities());
    }, [initializeQuantities]);

    const bookMutation = useBookTickets();

    const handleQuantityChange = useCallback((tier: string, value: number) => {
        setQuantities((prev) => ({ ...prev, [tier]: Math.max(0, value) }));
        // Clear success message when quantity changes
        setSuccessMessages(prev => ({
            ...prev,
            [tier]: null,
        }));
    }, []);

    const handleBook = useCallback((tier: string) => {
        const quantity = quantities[tier];
        if (quantity === 0) return;

        setBookingTier(tier);
        bookMutation.mutate(
            { tier, quantity, userId },
            {
                onSuccess: (data: BookTicketsResponse) => {
                    setSuccessMessages((prev) => ({
                        ...prev,
                        [tier]: MESSAGES.SUCCESS.BOOKING_SUCCESS(quantity, tier, data?.totalAmount),
                    }));
                    setQuantities((prev) => ({ ...prev, [tier]: 0 }));
                },
                onSettled: () => {
                    setTimeout(() => {
                        setSuccessMessages((prev) => ({ ...prev, [tier]: null }));
                    }, 7000);
                    setBookingTier(null);
                },
            }
        );
    }, [quantities, userId, bookMutation]);

    const getTotalQuantity = useCallback(() => {
        return Object.values(quantities).reduce((total, qty) => total + qty, 0);
    }, [quantities]);

    const getTotalPrice = useCallback(() => {
        return tickets.reduce((total, ticket) => {
            const quantity = quantities[ticket.tier] || 0;
            return total + (ticket.price * quantity);
        }, 0);
    }, [tickets, quantities]);

    return {
        quantities,
        successMessages,
        bookingTier,
        bookMutation,
        handleQuantityChange,
        handleBook,
        getTotalQuantity,
        getTotalPrice,
    };
};