import api from "../../../config/axios";

// ─── Verificar sesión (cookie HttpOnly) ─────────────────────
// Login, registro y logout los maneja Better Auth (authClient), no endpoints propios.
export const verifySessionService = () =>
  api.get("/auth/verify-auth").then((res) => res.data);
