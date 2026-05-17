import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  logout as logoutAction,
  setActiveRole,
} from "../../../redux/slices/authSlice";

import { logoutService } from "../services/authService";
// import { ROLES } from "../../../config/constants";

/**
 * Hook centralizado para acceder al estado de autenticación
 * y ejecutar acciones comunes (logout, cambiar rol, etc.)
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { user, roles, role_opcion, activeRole, colegio, isAuthenticated, error } =
    useSelector((state) => state.authSlice);

  // ─── Logout con mutation (limpia cookie en backend) ─────
  const logoutMutation = useMutation({
    mutationFn: logoutService,
    onSettled: () => {
      // Siempre limpiar estado local, incluso si falla el backend
      dispatch(logoutAction());
      queryClient.removeQueries({ queryKey: ["auth"] });
    },
  });

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  // ─── Cambiar rol activo ─────────────────────────────────
  const handleSetActiveRole = useCallback(
    (role) => {
      dispatch(setActiveRole(role));
    },
    [dispatch]
  );



  // ─── Helpers de roles ───────────────────────────────────
  const hasRole = useCallback(
    (role) => roles.includes(role),
    [roles]
  );

  const hasAnyRole = useCallback(
    (checkRoles) => checkRoles.some((role) => roles.includes(role)),
    [roles]
  );

  // const isSuperAdmin = roles.includes(ROLES.SUPER_ADMIN);
  // const isAdminColegio = roles.includes(ROLES.ADMIN_COLEGIO);
  // const isDocente = roles.includes(ROLES.DOCENTE);
  // const isAlumno = roles.includes(ROLES.ALUMNO);
  // const isPadre = roles.includes(ROLES.PADRE);

  return {
    // Estado
    user,
    roles,
    role_opcion,
    activeRole,
    colegio,
    isAuthenticated,
    isLoggingOut: logoutMutation.isPending,
    error,

    // Acciones
    handleLogout,
    handleSetActiveRole,
 

    // Helpers
    hasRole,
    hasAnyRole,
    // isSuperAdmin,
    // isAdminColegio,
    // isDocente,
    // isAlumno,
    // isPadre,
  };
};
