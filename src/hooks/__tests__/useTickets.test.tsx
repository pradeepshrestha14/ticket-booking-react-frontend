import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTickets } from "../useTickets";
import { axiosClient } from "../../api/client";

// Mock the client module
jest.mock("../../api/client", () => ({
  axiosClient: {
    get: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useTickets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return tickets on success", async () => {
    const mockData = [{ id: 1, tier: "VIP", price: 100 }];
    (axiosClient.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });

    const { result } = renderHook(() => useTickets(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it("should handle error", async () => {
    const error = new Error("API Error");
    (axiosClient.get as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useTickets(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
