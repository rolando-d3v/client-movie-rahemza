// ─── API Base URL ───────────────────────────────────────────
export const API_URL_MOVIE =
  import.meta.env.VITE_BACKEND_URL_MOVIE || "http://localhost:5000/";




export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "http:localhost:5173";







// ─── Paginación por defecto ─────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_ROUTES = {
  [1]: "/user-home",
};
