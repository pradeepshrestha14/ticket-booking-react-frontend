import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { bookTickets } from "../api/tickets";
import { BookTicketsRequest } from "../types/api";
import { TICKETS_QUERY_KEY } from "./useTickets";

export function useBookTickets() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: BookTicketsRequest) => bookTickets(payload),
        onError: (error: Error) => {
            message.error(error.message);
        },
        onSuccess: () => {
            message.success("Tickets booked successfully!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: TICKETS_QUERY_KEY });
        },

    });
}
