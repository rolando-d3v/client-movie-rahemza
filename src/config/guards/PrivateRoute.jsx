import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../modules/auth/hooks/useAuth";


const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role_opcion } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roleIds = Array.isArray(role_opcion)
    ? role_opcion.map((role) => role.role_id)
    : [];

  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = allowedRoles.some((role) => roleIds.includes(role));
    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
