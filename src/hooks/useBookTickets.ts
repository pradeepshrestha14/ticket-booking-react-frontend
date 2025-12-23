import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { bookTickets } from "@/api/tickets";
import { BookTicketsRequest } from "@/types/api";
import { TICKETS_QUERY_KEY } from "./useTickets";
import { MESSAGES } from "@/constants";

/**
 * Custom hook to book tickets using React Query mutation.
 * @param payload - The booking request data.
 * @returns {UseMutationResult<void, Error, BookTicketsRequest>} The mutation result.
 */
export function useBookTickets() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: BookTicketsRequest) => bookTickets(payload),
        onError: (error: Error) => {
            message.error(error.message);
        },
        onSuccess: () => {
            message.success(MESSAGES.SUCCESS.TICKETS_BOOKED);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: TICKETS_QUERY_KEY });
        },

    });
}
