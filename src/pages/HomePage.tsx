import React from "react";
import { Row, Col, Typography } from "antd";
import { useTickets } from "@/hooks/useTickets";
import { useTicketBooking } from "@/hooks/useTicketBooking";
import { TicketCard } from "@/components/TicketCard";

interface HomePageProps {
  userId: string;
}

export const HomePage: React.FC<HomePageProps> = ({ userId }) => {
  const { data: tickets = [], isLoading } = useTickets();
  const {
    quantities,
    successMessages,
    bookingTier,
    bookMutation,
    handleQuantityChange,
    handleBook,
  } = useTicketBooking({ userId });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Available Tickets
      </Typography.Title>
      <Typography.Paragraph style={{ textAlign: "center" }}>
        Book your tickets for the upcoming event
      </Typography.Paragraph>
      <Typography.Paragraph style={{ textAlign: "center" }}>
        Your User ID: {userId}
      </Typography.Paragraph>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {isLoading
          ? "Loading tickets..."
          : tickets.map((ticket) => (
              <Col span={8} key={ticket.tier}>
                <TicketCard
                  ticket={ticket}
                  quantity={quantities[ticket.tier]}
                  isBooking={
                    bookingTier === ticket.tier && bookMutation.isPending
                  }
                  onQuantityChange={handleQuantityChange}
                  onBook={handleBook}
                  successMessage={successMessages[ticket.tier]}
                />
              </Col>
            ))}
      </Row>
    </div>
  );
};
