import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:4000';

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging
axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for logging
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export { axiosClient };

/**
 * Configured Axios instance for API communication.
 * Includes base URL configuration, default headers, and request/response interceptors for logging.
 */