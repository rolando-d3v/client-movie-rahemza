import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  logout as logoutAction,
  setActiveRole,
} from "../../../redux/slices/authSlice";
import { authClient } from "../../../config/auth-client";

/**
 * Hook centralizado para acceder al estado de autenticación
 * y ejecutar acciones comunes (logout, cambiar rol, etc.)
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, roles, role_opcion, activeRole, colegio, isAuthenticated, error } =
    useSelector((state) => state.authSlice);

  // ─── Logout con better-auth ─────────────────────────────
  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut();
    } catch (err) {
      console.error("Error en signOut:", err);
    } finally {
      dispatch(logoutAction());
      queryClient.removeQueries({ queryKey: ["auth"] });
      setIsLoggingOut(false);
    }
  }, [dispatch, queryClient]);

  // ─── Cambiar rol activo ─────────────────────────────────
  const handleSetActiveRole = useCallback(
    (role) => {
      dispatch(setActiveRole(role));
    },
    [dispatch]
  );

  // ─── Helpers de roles ───────────────────────────────────
  const hasRole = useCallback(
    (role) => (roles || []).includes(role),
    [roles]
  );

  const hasAnyRole = useCallback(
    (checkRoles) => checkRoles.some((role) => (roles || []).includes(role)),
    [roles]
  );

  return {
    // Estado
    user,
    roles,
    role_opcion,
    activeRole,
    colegio,
    isAuthenticated,
    isLoggingOut,
    error,

    // Acciones
    handleLogout,
    handleSetActiveRole,

    // Helpers
    hasRole,
    hasAnyRole,
  };
};
