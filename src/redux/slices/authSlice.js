import { createSlice } from "@reduxjs/toolkit";

// ─── Estado inicial ─────────────────────────────────────────
const initialState = {
  // usuario autenticado { id, name, email, role, ... }
  user: null,

  // rol de plataforma: "admin" | "moderator" | null (null = usuario normal)
  role: null,

  // estado de autenticación
  isAuthenticated: false,

  // error de autenticación
  error: null,
};

// ─── Slice ──────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Establecer credenciales (login o verify exitoso)
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.role = user?.role ?? null;
      state.isAuthenticated = true;
      state.error = null;
    },

    // Cerrar sesión
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Guardar error de autenticación
    setAuthError: (state, action) => {
      state.error = action.payload;
    },

    // Limpiar error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  logout,
  setAuthError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
