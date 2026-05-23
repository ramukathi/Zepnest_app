// frontend/src/api/axios.js

import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://zepnestapp-production.up.railway.app/api",

  headers: {
    "Content-Type": "application/json",
  },
});

// ─────────────────────────────────────
// Request Interceptor
// Automatically attach JWT token
// ─────────────────────────────────────

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

// ─────────────────────────────────────
// Response Interceptor
// Auto logout if token expired
// ─────────────────────────────────────

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;