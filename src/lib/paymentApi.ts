import axios from "axios";

const API_URL = "https://api.etilang.web.id/api/public/midtrans";

const paymentApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export const createTransaction = async (data: { ticket_id: string; type: "sidang" | "denda" }) => {
  const response = await paymentApi.post("/transaction", data);
  return response.data;
};
