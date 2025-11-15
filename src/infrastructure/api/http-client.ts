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
    console.log(`[HTTP Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[HTTP Request Error]', error);
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
    console.log(`[HTTP Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('[HTTP Response Error]', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
