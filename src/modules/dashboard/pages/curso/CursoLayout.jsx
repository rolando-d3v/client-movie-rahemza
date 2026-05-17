import { useState } from "react";
import styles from "./preguntas.module.css";
import { useGetCurso } from "../../services/CursoService";
import { useParams } from "react-router";
import { useAppDispatch } from "../../../../redux/store";
import { x_curso } from "../../../../redux/slices/cursoSlice";
import Libros from "./Libros";
import Calificacion from "./calificaciones/Calificacion";
import Loading from "../../../../assets/spinner/spin.gif";

export default function CursoLayout() {
  const [activeTab, setActiveTab] = useState("libros");
  const params = useParams();
  const dispatch = useAppDispatch();

  const id = params?.id_curso;
  const CURSO = useGetCurso(id);

  console.log(id);
  console.log(CURSO.data);

  if (CURSO.data) {
    dispatch(x_curso(CURSO?.data));
  }

  if (CURSO.isLoading) {
    return (
      <div className={styles.loading_fullscreen}>
        <img  width="30%"  src={Loading} alt="Loading..." />
      </div>
    );
  }
  if (CURSO.isError) {
    return (
      <div className={styles.error_fullscreen}>
        Error: {CURSO.error.message}
      </div>
    );
  }

  const operativo = [
    {
      id: 0,
      name: "BIBLIOGRAFIA DESARROLLADA DE SO2 PARA SO1 ( INTG OPERATIVO)  2025",
      url: "RB DESARROLLADA DE SO2 PARA SO1 ( INTG OPERATIVO) PROM 2026_R.pdf",
    },
    {
      id: 1,
      name: "BIBLIOGRAFIA DESARROLLADAS DE SO1 PARA TCO3 ( INTG OPERATIVO) 2025",
      url: "RB DESARROLLADAS DE SO1 PARA TCO3 ( INTG OPERATIVO) PROM 2026_R.pdf",
    },
    {
      id: 2,
      name: "BIBLIOGRAFIA DESARROLLADA DE TCO3 PARA TCO2 ( INTG OPERATIVO) 2025",
      url: "RB DESARROLLADA DE TCO3 PARA TCO2 ( INTG OPERATIVO) PROM 2026_R.pdf",
    },
    {
      id: 3,
      name: "BIBLIOGRAFIA DESARROLLADAS DE TCO2 PARA TCO1 ( INTG OPERATIVO) 2025",
      url: "RB DESARROLLADAS DE TCO2 PARA TCO1 ( INTG OPERATIVO) PROM 2026_R.pdf",
    },
  ];

  const tecnica = [
    {
      id: 0,
      name: "BIBLIOGRAFIA DESARROLLADA DE SO2 PARA SO1 ( INTG TECNICA) 2025",
      url: "1. RB DESARROLLADAS PARA SO2 A SO1 ( INTG TECNICA) PROM 2026.pdf",
    },
    {
      id: 1,
      name: "BIBLIOGRAFIA DESARROLLADAS DE SO1 PARA TCO3 ( INTG TECNICA) 2025",
      url: "2. RB DESARROLLADAS PARA SO1 A TCO3  ( INTG TECNICA) PROM 2026.pdf",
    },
    {
      id: 2,
      name: "BIBLIOGRAFIA DESARROLLADA DE TCO3 PARA TCO2 ( INTG TECNICA) 2025",
      url: "4. RB DESARROLLADAS PARA TCO3 A TCO2  ( INTG TECNICA) PROM 2026.pdf",
    },
    {
      id: 3,
      name: "BIBLIOGRAFIA DESARROLLADAS DE TCO2 PARA TCO1 ( INTG TECNICA) 2025",
      url: "3. RB DESARROLLADAS PARA TCO2 A TCO1 ( INTG TECNICA) PROM 2026.pdf",
    },
  ];

  return (
    <main className={styles.app}>
      <div className={styles.tabs_wrapper}>
        <div className={styles.tabs_container}>
          <button
            className={`${styles.tab_button} ${activeTab === "libros" ? styles.tab_active : ""}`}
            onClick={() => setActiveTab("libros")}
            type="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "8px" }}
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            Bibliografía & Recursos
          </button>
          <button
            className={`${styles.tab_button} ${activeTab === "calificaciones" ? styles.tab_active : ""}`}
            onClick={() => setActiveTab("calificaciones")}
            type="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "8px" }}
            >
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
            Calificaciones
          </button>
        </div>
      </div>

      <div className={styles.tab_content}>
        {activeTab === "libros" && (
          <div className={styles.fade_in}>
            <div className={styles.container}>
              <Libros
                data={operativo}
                title="Bibliografía Desarrollada de la Especialidad Operativa 2025"
              />
              <Libros
                data={tecnica}
                title="Bibliografía Desarrollada de la Especialidad Técnica 2025"
              />
            </div>
          </div>
        )}

        {activeTab === "calificaciones" && (
          <div className={styles.fade_in}>
            <div className={styles.container}>
              <Calificacion />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
