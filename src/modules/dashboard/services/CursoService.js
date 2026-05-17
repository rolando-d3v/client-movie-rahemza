import axios from "axios";
// import { API_RAHEMSA } from "./apiRest";

import api from "../../../config/axios";
import { useQuery } from "@tanstack/react-query";

//? GET ONE CURSO
export const useGetCurso = (id) => {
  console.log(id);

  const ONE_CURSO = useQuery({
    queryKey: ["get-one-curso", id],
    queryFn: async () => {
      // const { data } = await axios.get(`${API_RAHEMSA}/curso/list-curso-secciones-tema?uuid=${id}`);
      const { data } = await api.get(
        `/curso/list-curso-secciones-tema?uuid=${id}`,
      );
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 5, // ✅ 5 horas (no refetch automático)
    gcTime: 1000 * 60 * 60 * 5, // mantiene en memoria

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return ONE_CURSO;
};

//? GET ALL CURSOS POR SU UUID USER
export const useGetMisCursos = (id) => {
  const ALL_MIS_CURSOS = useQuery({
    queryKey: ["get-all-mis-cursos"],
    queryFn: async () => {
      // const { data } = await axios.get(`${API_RAHEMSA}/curso/list-cursos-id?uuid=${id}`);
      const { data } = await api.get(`/curso/list-cursos-id?uuid=${id}`);
      return data;
    },
  });

  return ALL_MIS_CURSOS;
};

// ─── obtener one curso ──────────────────────────────────────────────────
export const getCursoService = (id) =>
  api
    .get(`/curso/list-curso-secciones-tema?uuid=${id}`)
    .then((res) => res.data);

// ? CREAR CALIFICACION
export const createCalificacionService = (data) =>
  api.post(`/calificacion/create`, data).then((res) => res.data);
// ? GET CALIFICACION
export const getCalificacionesService = (data) =>
  api
    .get(
      `/calificacion/all?user_id=${data?.user_id}&curso_id=${data?.curso_id}`,
    )
    .then((res) => res.data);
