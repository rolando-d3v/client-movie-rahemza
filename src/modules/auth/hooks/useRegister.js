import { useMutation } from "@tanstack/react-query";
import { registerService } from "../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router";

/**
 * Hook para manejar el flujo de registro con React Query
 */
export const useRegister = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerService,

    onSuccess: () => {
      toast.success("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate("/login", { replace: true });
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || "Error al registrar usuario";
      toast.error(message);
    },
  });

  const handleRegister = (userData) => {
    registerMutation.mutate(userData);
  };

  return {
    handleRegister,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
  };
};
