import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../modules/auth/hooks/useAuth";


const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/user-home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
