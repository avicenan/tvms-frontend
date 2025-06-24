import axios from "axios";

const API_URL = "https://api.etilang.web.id/api";

const reportViolationApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
  withCredentials: false,
});

export const reportViolation = async (formData: FormData) => {
  const response = await reportViolationApi.post("/detected-violation", formData);
  return response.data;
};
