import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../modules/auth/hooks/useAuth";


const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role_opcion } = useAuth();
  // const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  console.log(allowedRoles);
  console.log(role_opcion);
  console.log(role_opcion[0]?.role_id);

  const roleId = role_opcion.map((role) => role.role_id);

  console.log(roleId);
  

  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = allowedRoles.some((role) => roleId.includes(role));
    if (!hasPermission) {
      return <Navigate to="/no-autorizado" replace />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
