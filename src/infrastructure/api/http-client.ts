import axios from 'axios';

/**
 * Base URL for the API, configurable via environment variable.
 */
const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Configured HTTP client for API requests.
 */
export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Request interceptor
 *
 * @summary Intercepts and logs HTTP requests before they are sent.
 * @return {object} The modified request configuration.
 */
httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 *
 * @summary Intercepts and logs HTTP responses and errors.
 * @return {object} The response data or error.
 */
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
