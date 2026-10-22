// ─── API Base URL ───────────────────────────────────────────
export const API_URL_MOVIE =
  import.meta.env.VITE_BACKEND_URL_MOVIE || "http://localhost:4000";

// Si falta VITE_FRONTEND_URL se usa el origen real de la página: un fallback fijo a localhost
// mandaba a producción de vuelta a localhost:5173 tras iniciar sesión con Google.
export const FRONTEND_URL =
  import.meta.env.VITE_FRONTEND_URL || window.location.origin;

// ─── Paginación por defecto ─────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_ROUTES = {
  [1]: "/home",
  [2]: "/home",
};

