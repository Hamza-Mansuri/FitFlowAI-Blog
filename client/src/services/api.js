import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach JWT to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration (401 Unauthorized)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config.url || "";
      // Ignore login and register requests
      const isAuthRoute = requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");

      if (!isAuthRoute) {
        localStorage.removeItem("token");

        // Show toast warning
        toast.error("Your session has expired. Please log in again.");

        // Redirect to login if not already there, preventing infinite loops
        if (window.location.pathname !== "/login") {
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;