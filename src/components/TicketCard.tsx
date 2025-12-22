import { Card, Typography, InputNumber, Button, Tag } from "antd";
import { Ticket, TicketTier } from "../types/api";
import { ticketTierIconMap } from "../utils/ticketIcons";

interface Props {
  ticket: Ticket;
  quantity: number;
  isBooking: boolean;
  successMessage: string | null;
  onQuantityChange: (tier: TicketTier, value: number) => void;
  onBook: (tier: TicketTier) => void;
}

// Fully reusable
//  No API logic
//  Easy snapshot testing
export const TicketCard: React.FC<Props> = ({
  ticket,
  quantity,
  isBooking,
  successMessage,
  onQuantityChange,
  onBook,
}) => {
  const isSoldOut = ticket.availableQuantity === 0;

  return (
    <Card
      title={ticket.tier}
      extra={ticketTierIconMap[ticket.tier]}
      style={{ textAlign: "center" }}
    >
      <Typography.Title level={5}>${ticket.price}</Typography.Title>

      <p>Available: {ticket.availableQuantity}</p>

      {isSoldOut ? (
        <Tag color="orange">Sold Out</Tag>
      ) : (
        <>
          <InputNumber
            min={0}
            max={ticket.availableQuantity}
            value={quantity}
            onChange={(value) => onQuantityChange(ticket.tier, value ?? 0)}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <Button
            type="primary"
            block
            disabled={quantity === 0 || isBooking}
            onClick={() => onBook(ticket.tier)}
          >
            {isBooking ? "Booking..." : `Book ${quantity} Tickets`}
          </Button>
        </>
      )}
      {/* Per-tier success message */}
      {successMessage && (
        <div style={{ marginTop: 8 }}>
          <Typography.Text type="success">{successMessage}</Typography.Text>
        </div>
      )}
    </Card>
  );
};
