import { useQuery } from "@tanstack/react-query";
import { getAllTickets } from "../api/tickets";
import { Ticket } from "../types/api";

export const TICKETS_QUERY_KEY = ["tickets"];

export function useTickets() {
    return useQuery<Ticket[], Error>({
        queryKey: TICKETS_QUERY_KEY,
        queryFn: getAllTickets,
    });
}
