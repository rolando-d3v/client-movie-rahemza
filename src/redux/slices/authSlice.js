import { createSlice } from "@reduxjs/toolkit";

// ─── Estado inicial ─────────────────────────────────────────
const initialState = {
  // usuario autenticado
  user: null,
  // { id, email, nombre, apellido, ... }

  // roles del usuario  ["super_admin", "admin_colegio"]
  roles: [],
  role_opcion: [],

  // rol activo seleccionado (cuando tiene múltiples)
  activeRole: null,

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
      const { user, roles, role_opcion } = action.payload;      
      state.user = user;
      state.roles = roles || [];
      state.role_opcion = role_opcion || [];
      state.activeRole = role_opcion?.[0] || null;
      state.isAuthenticated = true;
      state.error = null;
    },

    // Cerrar sesión
    logout: (state) => {
      state.user = null;
      state.roles = [];
      state.role_opcion = [];
      state.activeRole = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Cambiar rol activo (para usuarios con múltiples roles)
    setActiveRole: (state, action) => {
      state.activeRole = action.payload;
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
  setActiveRole,
  setAuthError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
