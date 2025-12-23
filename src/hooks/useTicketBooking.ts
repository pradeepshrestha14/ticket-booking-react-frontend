import { useState, useCallback } from "react";
import { useBookTickets } from "./useBookTickets";
import { BookTicketsResponse, TicketTier } from "@/types/api";
import { MESSAGES } from "@/constants";

interface UseTicketBookingProps {
    userId: string;
}

export const useTicketBooking = ({ userId }: UseTicketBookingProps) => {
    const [quantities, setQuantities] = useState<Record<TicketTier, number>>({
        VIP: 0,
        FRONT_ROW: 0,
        GA: 0,
    });
    const [successMessages, setSuccessMessages] = useState<Record<TicketTier, string | null>>({
        VIP: null,
        FRONT_ROW: null,
        GA: null,
    });
    const [bookingTier, setBookingTier] = useState<TicketTier | null>(null);

    const bookMutation = useBookTickets();

    const handleQuantityChange = useCallback((tier: TicketTier, value: number) => {
        setQuantities((prev) => ({ ...prev, [tier]: value }));
    }, []);

    const handleBook = useCallback((tier: TicketTier) => {
        const quantity = quantities[tier];
        if (quantity === 0) return;

        setBookingTier(tier);
        bookMutation.mutate(
            { tier, quantity, userId },
            {
                onSuccess: (data: BookTicketsResponse) => {
                    setSuccessMessages((prev) => ({
                        ...prev,
                        [tier]: MESSAGES.SUCCESS.BOOKING_SUCCESS(quantity, tier, quantity * data.totalAmount),
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

    return {
        quantities,
        successMessages,
        bookingTier,
        bookMutation,
        handleQuantityChange,
        handleBook,
    };
};