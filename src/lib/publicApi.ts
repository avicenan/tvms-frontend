import axios from "axios";

const API_URL = "https://api.etilang.web.id/api/public";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

export const publicApi = {
  getTicket: (ticketId: string, vehicleNo: string) => api.get(`/tickets/${ticketId}/${vehicleNo}`),
  uploadAppeal: (ticketId: string, evidence: File, argument: string) =>
    api.post(
      `/appeal`,
      { ticket_id: ticketId, evidence, argument },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
};
