import { render, screen, fireEvent } from "@testing-library/react";
import { TicketCard } from "../TicketCard";
import { Ticket } from "@/types/api";

const mockTicket: Ticket = {
  id: 1,
  tier: "VIP" as const,
  price: 100,
  availableQuantity: 10,
  totalQuantity: 50,
};

describe("TicketCard", () => {
  it("should render ticket details", () => {
    render(
      <TicketCard
        ticket={mockTicket}
        quantity={2}
        isBooking={false}
        onQuantityChange={() => {}}
        onBook={() => {}}
        successMessage={null}
      />
    );

    expect(screen.getByText("VIP")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Available: 10")).toBeInTheDocument();
  });

  it("should call onQuantityChange when input changes", () => {
    const mockOnChange = jest.fn();
    render(
      <TicketCard
        ticket={mockTicket}
        quantity={2}
        isBooking={false}
        onQuantityChange={mockOnChange}
        onBook={() => {}}
        successMessage={null}
      />
    );

    const input = screen.getByDisplayValue("2");
    fireEvent.change(input, { target: { value: "3" } });

    expect(mockOnChange).toHaveBeenCalledWith("VIP", 3);
  });

  it("should show booking state", () => {
    render(
      <TicketCard
        ticket={mockTicket}
        quantity={2}
        isBooking={true}
        onQuantityChange={() => {}}
        onBook={() => {}}
        successMessage={null}
      />
    );

    expect(screen.getByText("Booking...")).toBeInTheDocument();
  });
});
