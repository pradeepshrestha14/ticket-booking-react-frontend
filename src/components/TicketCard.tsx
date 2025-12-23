import { Card, Typography, InputNumber, Button, Tag } from "antd";
import { getTierIcon } from "@/utils/ticketIcons";
import React from "react";
import { TEXTS, MESSAGES } from "@/constants";
import { TicketCardProps } from "@/types/components";

/**
 * Component for displaying a ticket card with booking functionality.
 * @param ticket - The ticket data.
 * @param quantity - Current selected quantity.
 * @param isBooking - Whether booking is in progress.
 * @param successMessage - Success message after booking.
 * @param onQuantityChange - Handler for quantity change.
 * @param onBook - Handler for booking.
 */
export const TicketCard: React.FC<TicketCardProps> = React.memo(
  ({
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
        title={ticket.label}
        extra={getTierIcon(ticket.tier)}
        style={{ textAlign: "center" }}
      >
        <Typography.Title level={5}>${ticket.price}</Typography.Title>

        <p>Available: {ticket.availableQuantity}</p>

        {isSoldOut ? (
          <Tag color="orange">{TEXTS.SOLD_OUT}</Tag>
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
              {isBooking
                ? MESSAGES.LOADING.BOOKING
                : TEXTS.BOOK_BUTTON(quantity)}
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
  }
);
