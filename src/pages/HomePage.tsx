import React, { useState } from "react";
import { Row, Col, Typography } from "antd";
import { useTickets } from "../hooks/useTickets";
import { useBookTickets } from "../hooks/useBookTickets";
import { BookTicketsResponse, TicketTier } from "../types/api";
import { TicketCard } from "../components/TicketCard";

const USER_ID = "user-1766388127080";

export const HomePage: React.FC = () => {
  const { data: tickets = [], isLoading } = useTickets();
  const [bookingTier, setBookingTier] = useState<TicketTier | null>(null);
  const [successMessages, setSuccessMessages] = useState<
    Record<TicketTier, string | null>
  >({
    VIP: null,
    FRONT_ROW: null,
    GA: null,
  });

  const bookMutation = useBookTickets();

  const [quantities, setQuantities] = useState<Record<TicketTier, number>>({
    VIP: 0,
    FRONT_ROW: 0,
    GA: 0,
  });

  const handleQuantityChange = (tier: TicketTier, value: number) => {
    setQuantities((prev) => ({ ...prev, [tier]: value }));
  };

  const handleBook = (tier: TicketTier) => {
    const quantity = quantities[tier];

    if (quantity === 0) return;

    setBookingTier(tier);

    bookMutation.mutate(
      {
        tier,
        quantity,
        userId: USER_ID,
      },
      {
        onSuccess: (data: BookTicketsResponse) => {
          // set per-tier success message with total price
          setSuccessMessages((prev) => ({
            ...prev,
            [tier]: `Successfully booked ${quantity} ${tier} ticket(s)! Total: $${
              quantity * data.totalAmount
            }`,
          }));

          //  reset quantity for this tier only
          setQuantities((prev) => ({
            ...prev,
            [tier]: 0,
          }));
        },
        onSettled: () => {
          setTimeout(() => {
            setSuccessMessages((prev) => ({
              ...prev,
              [tier]: null,
            }));
          }, 7000);
          setBookingTier(null);
        },
      }
    );
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Available Tickets
      </Typography.Title>
      <Typography.Paragraph style={{ textAlign: "center" }}>
        Book your tickets for the upcoming event
      </Typography.Paragraph>
      <Typography.Paragraph style={{ textAlign: "center" }}>
        Your User ID: {USER_ID}
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
