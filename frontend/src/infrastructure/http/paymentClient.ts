import axios from 'axios';

const PAYMENT_BASE_URL = import.meta.env.VITE_PAYMENT_API_URL || 'http://localhost:8081/api/v1';

export const paymentClient = axios.create({
  baseURL: PAYMENT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

paymentClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default paymentClient;
