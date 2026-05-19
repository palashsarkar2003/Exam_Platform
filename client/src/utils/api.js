import axios from "axios";
import { BACKEND_URL } from "./backend_url";
const api = axios.create({
  baseURL: `${BACKEND_URL}/api`||"/api",
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Handle Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // IMPORTANT:
      // Do NOT redirect using window.location.href
      // React Router will handle navigation safely
    }

    return Promise.reject(error);
  }
);

export default api;