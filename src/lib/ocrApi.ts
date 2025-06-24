import axios from "axios";

// CORS proxy for production fallback
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

// Use proxy URL in development to avoid CORS issues
// For production, we can use a CORS proxy if the server doesn't support CORS
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return "/ocr";
  }

  // In production, try direct URL first, fallback to CORS proxy if needed
  return "https://ocr.cenawithc.site";
};

const API_URL = getApiUrl();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "*/*",
  },
  withCredentials: false,
  timeout: 30000, // 30 second timeout
});

// Create a fallback API instance with CORS proxy
const corsProxyApi = axios.create({
  baseURL: CORS_PROXY + "https://ocr.cenawithc.site",
  headers: {
    Accept: "*/*",
  },
  withCredentials: false,
  timeout: 30000,
});

// Add error interceptor to handle CORS errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ERR_NETWORK" || error.message.includes("CORS")) {
      console.warn("CORS error detected, this might be a server configuration issue");
    }
    return Promise.reject(error);
  }
);

export const ocrApi = {
  detect: async (formData: FormData) => {
    // Debug: Check if file is properly attached
    const file = formData.get("file");
    if (!file) {
      throw new Error("No file found in FormData");
    }

    // console.log("Sending file to OCR API:", {
    //   fileName: file instanceof File ? file.name : "Unknown",
    //   fileSize: file instanceof File ? file.size : "Unknown",
    //   fileType: file instanceof File ? file.type : "Unknown",
    // });

    // console.log("API URL:", API_URL);
    // console.log("Full request URL:", `${API_URL}/detect`);

    try {
      // Try direct API call first
      return await api.post(`/detect`, formData);
    } catch (error: any) {
      console.error("OCR API Error:", error);
      // If CORS error in production, try with CORS proxy
      if (!import.meta.env.DEV && (error.code === "ERR_NETWORK" || error.message.includes("CORS"))) {
        // console.log("Retrying with CORS proxy...");
        return await corsProxyApi.post(`/detect`, formData);
      }
      throw error;
    }
  },
};
