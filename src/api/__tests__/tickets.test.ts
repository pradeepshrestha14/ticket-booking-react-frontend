import { getAllTickets, bookTickets } from '../tickets';
import { axiosClient } from '../client';
import { BookTicketsRequest } from '@/types/api';

// Mock the client module
jest.mock('../client', () => ({
    axiosClient: {
        get: jest.fn(),
        post: jest.fn(),
    },
}));

describe('API tickets', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTickets', () => {
        it('should return tickets on success', async () => {
            const mockData = [{ id: 1, tier: 'VIP', price: 100 }];
            (axiosClient.get as jest.Mock).mockResolvedValueOnce({ data: { data: mockData } });

            const result = await getAllTickets();
            expect(result).toEqual(mockData);
        });

        it('should throw error on failure', async () => {
            const error = new Error('API Error');
            (axiosClient.get as jest.Mock).mockRejectedValueOnce(error);

            await expect(getAllTickets()).rejects.toThrow();
        });
    });

    describe('bookTickets', () => {
        it('should return booking response on success', async () => {
            const mockData = { totalAmount: 100 };
            const payload = { tier: 'VIP', quantity: 1, userId: 'user1' } as BookTicketsRequest;
            (axiosClient.post as jest.Mock).mockResolvedValueOnce({ data: { data: mockData } });

            const result = await bookTickets(payload);
            expect(result).toEqual(mockData);
        });

        it('should throw error on failure', async () => {
            const payload = { tier: 'VIP', quantity: 1, userId: 'user1' } as BookTicketsRequest;
            const error = new Error('API Error');
            (axiosClient.post as jest.Mock).mockRejectedValueOnce(error);

            await expect(bookTickets(payload)).rejects.toThrow();
        });
    });
});