import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/authService";
import { setCredentials } from "../../../redux/slices/authSlice";
import { DEFAULT_ROUTES } from "../../../config/constants";
import { toast } from "sonner";

/**
 * Hook para manejar el flujo de login con React Query
 */
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginService,

    onSuccess: (data) => {
      // Guardar datos del usuario en Redux
      dispatch(setCredentials(data));
      console.log(data);

      // Redirigir según el primer rol del usuario
      const primaryRole = data.roles?.[0];
      console.log(primaryRole);
      const redirectPath = DEFAULT_ROUTES[primaryRole] || "/dashboard";
      console.log(redirectPath);

      toast.success(`¡Bienvenido, ${data.user?.nombre || ""}!`);
      navigate(redirectPath, { replace: true });
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || "Credenciales incorrectas";
      toast.error(message);
    },
  });

  const handleLogin = (credentials) => {
    loginMutation.mutate(credentials);
  };

  return {
    handleLogin,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
