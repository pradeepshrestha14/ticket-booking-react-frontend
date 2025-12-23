import { useQuery } from "@tanstack/react-query";
import { getAllTickets } from "@/api/tickets";
import { Ticket } from "@/types/api";

export const TICKETS_QUERY_KEY = ["tickets"];

/**
 * Custom hook to fetch all tickets using React Query.
 * @returns {UseQueryResult<Ticket[], Error>} The query result containing tickets data or error.
 */
export function useTickets() {
    return useQuery<Ticket[], Error>({
        queryKey: TICKETS_QUERY_KEY,
        queryFn: getAllTickets,
    });
}
