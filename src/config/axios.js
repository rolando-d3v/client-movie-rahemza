import axios from "axios";
import { API_URL_MOVIE } from "./constants";

const api = axios.create({
  baseURL: API_URL_MOVIE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ← envía cookies HttpOnly en cada petición
});

// ─── Response interceptor: maneja 401 (sesión expirada) ─────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si la petición da 401 y no es la verificación inicial pasiva de sesión
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("/auth/verify-auth")
    ) {
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
