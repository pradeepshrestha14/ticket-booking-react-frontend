import React from "react";
import { Row, Col } from "antd";
import { TicketCard } from "./TicketCard";
import { Ticket, TicketTier } from "@/types/api";

interface TicketListProps {
  tickets: Ticket[];
  quantities: Record<TicketTier, number>;
  successMessages: Record<TicketTier, string | null>;
  isBooking: (tier: TicketTier) => boolean;
  onQuantityChange: (tier: TicketTier, value: number) => void;
  onBook: (tier: TicketTier) => void;
}

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
