import { useNavigate } from "react-router";
import { authClient } from "../../config/auth-client";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Error en signOut:", error);
    } finally {
      dispatch(logout());
      queryClient.removeQueries({ queryKey: ["auth"] });
      toast.success("Sesión cerrada");
      navigate("/login", { replace: true });
    }
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}