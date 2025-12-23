import { parseApiError } from '../parseApiError';

describe('parseApiError', () => {
    it('should return an Error with the message if error is an instance of Error', () => {
        const error = new Error('Test error');
        const result = parseApiError(error);
        expect(result).toBeInstanceOf(Error);
        expect(result.message).toBe('Something went wrong. Please try again.');
    });

    it('should return an Error with the response data message if error has response', () => {
        const error = {
            isAxiosError: true,
            response: {
                data: { error: { message: 'API error message' } },
            },
        };
        const result = parseApiError(error);
        expect(result).toBeInstanceOf(Error);
        expect(result.message).toBe('API error message');
    });

    it('should return an Error with a default message if no specific error details', () => {
        const error = {};
        const result = parseApiError(error);
        expect(result).toBeInstanceOf(Error);
        expect(result.message).toBe('Something went wrong. Please try again.');
    });
});