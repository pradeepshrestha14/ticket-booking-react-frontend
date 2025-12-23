import React from "react";
import { Row, Col } from "antd";
import { TicketCard } from "./TicketCard";
import { Ticket } from "@/types/api";

interface TicketListProps {
  tickets: Ticket[];
  quantities: Record<string, number>;
  successMessages: Record<string, string | null>;
  isBooking: (tier: string) => boolean;
  onQuantityChange: (tier: string, value: number) => void;
  onBook: (tier: string) => void;
}

/**
 * Component that renders a list of ticket cards in a responsive grid layout.
 * @param tickets - Array of ticket objects to display
 * @param quantities - Current selected quantities for each ticket tier
 * @param successMessages - Success messages for each ticket tier after booking
 * @param isBooking - Function to check if a specific tier is currently being booked
 * @param onQuantityChange - Handler for quantity changes
 * @param onBook - Handler for booking tickets
 */
export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  quantities,
  successMessages,
  isBooking,
  onQuantityChange,
  onBook,
}) => (
  <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
    {tickets.map((ticket) => (
      <Col span={8} key={ticket.tier}>
        <TicketCard
          ticket={ticket}
          quantity={quantities[ticket.tier]}
          isBooking={isBooking(ticket.tier)}
          onQuantityChange={onQuantityChange}
          onBook={onBook}
          successMessage={successMessages[ticket.tier]}
        />
      </Col>
    ))}
  </Row>
);
