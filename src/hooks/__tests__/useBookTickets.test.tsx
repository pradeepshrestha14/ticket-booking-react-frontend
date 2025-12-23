import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBookTickets } from "../useBookTickets";
import { BookTicketsRequest } from "@/types/api";
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

describe("useBookTickets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should book tickets successfully", async () => {
    const mockData = { totalAmount: 100 };
    const payload = {
      tier: "VIP",
      quantity: 1,
      userId: "user1",
    } as BookTicketsRequest;
    (axiosClient.post as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });

    const { result } = renderHook(() => useBookTickets(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(payload);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it("should handle error", async () => {
    const payload = {
      tier: "VIP",
      quantity: 1,
      userId: "user1",
    } as BookTicketsRequest;
    const error = new Error("API Error");
    (axiosClient.post as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useBookTickets(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(payload);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
