import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTicketBooking } from "../useTicketBooking";
import { axiosClient } from "../../api/client";

// Mock the client module
jest.mock("../../api/client", () => ({
  axiosClient: {
    post: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useTicketBooking", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update quantity", () => {
    const { result } = renderHook(() => useTicketBooking({ userId: "user1" }), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleQuantityChange("VIP", 5);
    });

    expect(result.current.quantities.VIP).toBe(5);
  });

  it("should handle booking success", async () => {
    const mockData = { totalAmount: 500 };
    (axiosClient.post as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });

    const { result } = renderHook(() => useTicketBooking({ userId: "user1" }), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleQuantityChange("VIP", 5);
    });

    act(() => {
      result.current.handleBook("VIP");
    });

    expect(result.current.bookingTier).toBe("VIP");
  });
});
