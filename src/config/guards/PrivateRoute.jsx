import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../modules/auth/hooks/useAuth";

/**
 * Exige sesión. Con `allowedRoles` (p. ej. ["admin"] o ["admin", "moderator"]) exige además
 * ese rol de plataforma; sin `allowedRoles` basta con estar autenticado (los usuarios normales
 * no tienen rol: role = null).
 */
const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, hasAnyRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
