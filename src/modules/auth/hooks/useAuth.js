import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { logout as logoutAction } from "../../../redux/slices/authSlice";
import { authClient } from "../../../config/auth-client";

/**
 * Hook centralizado para acceder al estado de autenticación
 * y ejecutar acciones comunes (logout, comprobar rol, etc.)
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, role, isAuthenticated, error } =
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

  // ─── Helpers de rol ─────────────────────────────────────
  // `role` es "admin" | "moderator" | null (null = usuario normal).
  const hasRole = useCallback((name) => !!role && role === name, [role]);

  const hasAnyRole = useCallback(
    (names) => !!role && names.includes(role),
    [role]
  );

  return {
    // Estado
    user,
    role,
    isAdmin: role === "admin",
    isModerator: role === "admin" || role === "moderator",
    isAuthenticated,
    isLoggingOut,
    error,

    // Acciones
    handleLogout,

    // Helpers
    hasRole,
    hasAnyRole,
  };
};
