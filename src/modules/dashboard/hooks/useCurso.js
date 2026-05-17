import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";
import { set_curso_activo, set_id_pregunta } from "../../../redux/slices/cursoSlice";

import { createCalificacionService, getCalificacionesService, getCursoService } from "../services/CursoService";
import { toast } from "sonner";
// import { ROLES } from "../../../config/constants";

/**
 * Hook centralizado para acceder al estado de autenticación
 * y ejecutar acciones comunes (logout, cambiar rol, etc.)
 */
export const useCurso = () => {
  const dispatch = useDispatch();
  //   const queryClient = useQueryClient();

  const { curso, curso_activo, id_pregunta,id_seccion  } = useSelector((state) => state.cursoSlice);

  //? GET ONE CURSO
  const useGetCurso = (id) => {
    console.log(id);

    const ONE_CURSO = useQuery({
      queryKey: ["get-one-cursox", id],
      queryFn: () => getCursoService(id),
      enabled: !!id, //este codigo ayuda si es null no se ejecute la peticion
    });

    return ONE_CURSO;
  };

  // ─── Helpers de roles ───────────────────────────────────
  const hasCursoActivo = useCallback(() => {
    dispatch(set_curso_activo(false));
  }, [dispatch]);

  // ─── Helpers de roles ───────────────────────────────────
  const handleSetIdPregunta = useCallback((id) => {
    dispatch(set_id_pregunta(id));
  }, [dispatch]);



   const createCalificacionMutation = useMutation({
    mutationFn: createCalificacionService,

    onSuccess: (data) => {

     console.log(data);
     
    console.log("success");
    
      // toast.success(`¡Bienvenido, ${data.user?.nombre || ""}!`);
      // navigate(redirectPath, { replace: true });
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || "Credenciales incorrectas";
      toast.error(message);
    },
  });
  
  

 //? GET CALIFICACIONES
  const useGetCalificaciones = (data) => {
    const CALIFICACIONES = useQuery({
      queryKey: ["get-calificaciones", data],
      queryFn: () => getCalificacionesService(data),
    });

    return CALIFICACIONES;
  };

  // ─── Logout con mutation (limpia cookie en backend) ─────
  //   const logoutMutation = useMutation({
  //     mutationFn: logoutService,
  //     onSettled: () => {
  //       dispatch(logoutAction());
  //       queryClient.removeQueries({ queryKey: ["auth"] });
  //     },
  //   });

  //   const handleLogout = useCallback(() => {
  //     logoutMutation.mutate();
  //   }, [logoutMutation]);

  // ─── Cambiar rol activo ─────────────────────────────────
  //   const handleSetActiveRole = useCallback(
  //     (role) => {
  //       dispatch(setActiveRole(role));
  //     },
  //     [dispatch]
  //   );

  // ─── Helpers de roles ───────────────────────────────────
  //   const hasRole = useCallback(
  //     (role) => roles.includes(role),
  //     [roles]
  //   );

  //   const hasAnyRole = useCallback(
  //     (checkRoles) => checkRoles.some((role) => roles.includes(role)),
  //     [roles]
  //   );

  return {
    // Estado
    curso,
    curso_activo,
    id_pregunta,
    id_seccion,

    // query
    useGetCurso,
    useGetCalificaciones,

    //mutations
    createCalificacionMutation,


    // cambio en state de redux
    hasCursoActivo,
    handleSetIdPregunta,
  };
};
