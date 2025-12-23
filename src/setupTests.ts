import '@testing-library/jest-dom';

// Mock import.meta for Vite environment variables
(global as typeof globalThis & { import: { meta: { env: { VITE_API_URL: string } } } }).import = {
    meta: {
        env: {
            VITE_API_URL: 'http://localhost:4000',
        },
    },
};