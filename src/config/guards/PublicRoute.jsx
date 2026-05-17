import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../modules/auth/hooks/useAuth";


/**
 * Protege rutas públicas (login, recover, register).
 * Si ya está autenticado → redirige al dashboard según su rol.
 *
 * Nota: AuthInitializer ya maneja la verificación inicial de sesión,
 * por lo que aquí solo se verifica si está autenticado.
 */
const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
