import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://api.etilang.web.id/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = Cookies.get("validation_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const validationApi = {
  getViolationById: (id: string) => api.get(`/violations/${id}`),
  revokeSession: (id: string) => api.post(`/violations/revoke-token/${id}`),
  updateViolation: (id: string, data: { number: string }) => api.put(`/update-violation/${id}`, data),
  validateViolation: (id: string) => api.put(`/verify-violation/${id}`),
  cancelViolation: (id: string, data: { cancel_description: string }) => api.put(`/cancel-violation/${id}`, data),
};
