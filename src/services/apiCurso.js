// import axios from "axios";
// import { API_RAHEMSA } from "./apiRest";
// import { useQuery } from "@tanstack/react-query";

// //? GET ONE CURSO
// export const useGetCurso = (id) => {
//   console.log(id);

//   const ONE_CURSO = useQuery({
//     queryKey: ["get-one-curso", id],
//     queryFn: async () => {
//       const { data } = await axios.get(`${API_RAHEMSA}/curso/list-curso-secciones-tema?uuid=${id}`);
//       return data;
//     },
//     enabled: !!id,
//   });

//   return ONE_CURSO;
// };

// //? GET ALL CURSOS POR SU UUID USER
// export const useGetMisCursos = (id) => {
//   const ALL_MIS_CURSOS = useQuery({
//     queryKey: ["get-all-mis-cursos"],
//     queryFn: async () => {
//       const { data } = await axios.get(`${API_RAHEMSA}/curso/list-cursos-id?uuid=${id}`);
//       return data;
//     },
//   });

//   return ALL_MIS_CURSOS;
// };
