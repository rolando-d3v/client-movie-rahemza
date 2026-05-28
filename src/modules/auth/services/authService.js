import api from "../../../config/axios";
// import api from "../../../config/axios";


// ─── Login ──────────────────────────────────────────────────
export const loginService = (credentials) =>
  api.post("/auth/login", credentials).then((res) => res.data);

// ─── Verificar sesión (cookie HttpOnly) ─────────────────────
export const verifySessionService = () =>
  api.get("/auth/verify-auth").then((res) => res.data);


// ─── Cerrar sesión en el backend ────────────────────────────
export const logoutService = () =>
  api.post("/auth/logout").then((res) => res.data);





















// ─── Registro ───────────────────────────────────────────────
export const registerService = (userData) =>
  api.post("/auth/register", userData).then((res) => res.data);


// ─── Solicitar recuperación de contraseña ───────────────────
export const recoverPasswordService = (email) =>
  api.post("/auth/recover", { email }).then((res) => res.data);

// ─── Resetear contraseña con token ──────────────────────────
export const resetPasswordService = ({ token, password }) =>
  api.post("/auth/reset-password", { token, password }).then((res) => res.data);

// ─── Cambiar contraseña (autenticado) ───────────────────────
export const changePasswordService = ({ currentPassword, newPassword }) =>
  api
    .put("/auth/change-password", { currentPassword, newPassword })
    .then((res) => res.data);
