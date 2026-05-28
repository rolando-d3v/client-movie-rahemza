import { useNavigate } from "react-router";
import { authClient } from "../../config/auth-client";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      // Limpiar el estado de Redux para que PublicRoute no redirija de vuelta
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );

}