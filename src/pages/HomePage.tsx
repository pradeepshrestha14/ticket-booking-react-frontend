import React from "react";
import { Typography } from "antd";
import { useTickets } from "@/hooks/useTickets";
import { useTicketBooking } from "@/hooks/useTicketBooking";
import { TEXTS, MESSAGES } from "@/constants";
import { HomePageProps } from "@/types/components";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { LoadingDisplay } from "@/components/LoadingDisplay";
import { TicketList } from "@/components/TicketList";

/**
 * Main page component for the ticket booking application.
 * Displays available tickets, handles booking logic, and manages loading/error states.
 * @param userId - The ID of the current user for booking operations
 */
export const HomePage: React.FC<HomePageProps> = ({ userId }) => {
  const {
    data: tickets = [],
    isLoading,
    error,
    isError,
    refetch,
  } = useTickets();
  const {
    quantities,
    successMessages,
    bookingTier,
    bookMutation,
    handleQuantityChange,
    handleBook,
  } = useTicketBooking({ userId, tickets });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        {TEXTS.PAGE_TITLE}
      </Typography.Title>
      <Typography.Paragraph style={{ textAlign: "center" }}>
        {TEXTS.PAGE_DESCRIPTION}
      </Typography.Paragraph>
      <Typography.Paragraph style={{ textAlign: "center" }}>
        {TEXTS.USER_ID_LABEL} {userId}
      </Typography.Paragraph>
      {isError ? (
        <ErrorDisplay
          message="Failed to Load Tickets"
          description={
            (error as Error)?.message || MESSAGES.ERROR.FETCH_TICKETS_FAILED
          }
          onRetry={refetch}
        />
      ) : isLoading ? (
        <LoadingDisplay message={MESSAGES.LOADING.LOADING_TICKETS} />
      ) : (
        <TicketList
          tickets={tickets}
          quantities={quantities}
          successMessages={successMessages}
          isBooking={(tier) => bookingTier === tier && bookMutation.isPending}
          onQuantityChange={handleQuantityChange}
          onBook={handleBook}
        />
      )}
    </div>
  );
};
