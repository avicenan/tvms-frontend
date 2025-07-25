import axios from "axios";

// Use proxy URL in development to avoid CORS issues
// For production, use direct API call once CORS is configured on the Flask server
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return "/ocr";
  }

  // In production, use direct API call
  return "https://ocr2.cenawithc.site";
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

// Add error interceptor to handle CORS errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ERR_NETWORK" || error.message.includes("CORS") || error.response?.status === 403 || error.response?.status === 0) {
      console.warn("CORS error detected. Make sure CORS is configured on the Flask server.");
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

    if (!(file instanceof File)) {
      throw new Error("FormData 'file' is not a File object");
    }

    console.log("Sending file to OCR API:", {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    // Debug: Log all FormData entries
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value);
    }

    console.log("API URL:", API_URL);
    console.log("Full request URL:", `${API_URL}/detect`);
    console.log("Environment:", import.meta.env.MODE);

    try {
      const response = await api.post(`/detect`, formData);
      console.log("OCR API Response:", response.status, response.statusText);
      return response;
    } catch (error: any) {
      console.error("OCR API Error:", error);
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message,
        code: error.code,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
        },
      });

      throw error;
    }
  },
};
