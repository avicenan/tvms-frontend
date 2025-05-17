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
  const token = Cookies.get("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Handle any cookies in the response
    const cookies = response.headers["set-cookie"];
    if (cookies) {
      cookies.forEach((cookie) => {
        const [cookieStr] = cookie.split(";");
        const [name, value] = cookieStr.split("=");
        if (name && value) {
          Cookies.set(name, value, {
            path: "/",
            sameSite: "none",
            secure: true,
          });
        }
      });
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      Cookies.remove("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials: { email: string; password: string }) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  verify2FA: (otp: string) => api.post("/auth/2fa-verify", { otp }),
  register2FA: () =>
    api.get("/auth/2fa-registration", {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/json",
        "Content-Type": "image/png",
      },
    }),
  // getProfile: () => api.get("/auth/profile"),
};

export const violationApi = {
  getViolations: () => api.get("/violations?page=1"),
  createToken: (id: string) => api.get(`/create-token-verification/${id}`),
};

export const ticketApi = {
  getTickets: () => api.get("/tickets"),
  getTicketById: (id: string) => api.get(`/tickets/${id}`),
};

export const appealApi = {
  getAppeals: () => api.get("/appeals"),
};

export default api;
