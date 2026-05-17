import { Link } from "react-router";
import { FaStopCircle, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import Timer from "./time/Time";
import { useAppSelector, useAppDispatch } from "../../../../redux/store";
import {
  x_array_respuestas,
  x_marcarPregunta,
} from "../../../../redux/slices/cursoSlice";
import { ToastError, ToastSuccess, ToastWarningConfirm } from "../../../../tools/Toasting";
import styles from "./main.module.css";
import SidebarTema from "./sidebar_tema/SidebarTema";
import { useCurso } from "../../hooks/useCurso";

import { setOpenSidebarNumeroPreguntas } from "../../../../redux/slices/estateSlice";
import { useAuth } from "../../../auth/hooks/useAuth";

const TemaPage = () => {
  const {
    handleSetIdPregunta,
    id_pregunta,
    id_seccion,
    curso,
    createCalificacionMutation,
  } = useCurso();

  const { user } = useAuth();
  console.log(user);

  const { open_sidebar_numero_preguntas } = useAppSelector(
    (state) => state.stateSlice,
  );

  const { array_preguntas, tema_preguntas, array_respuestas } = useAppSelector(
    (state) => state.cursoSlice,
  );

  const dispatch = useAppDispatch();

  const calcularResultados = () => {
    const correctas = array_respuestas.filter(
      (r) => r.respuestaSeleccionada?.resp_correcta_i === 1,
    ).length;
    const incorrectas = array_respuestas.filter(
      (r) => r.respuestaSeleccionada?.resp_correcta_i === 0,
    ).length;
    return {
      total_preguntas: array_respuestas.length,
      respuestas_correctas: correctas,
      respuestas_incorrectas: incorrectas,
    };
  };

  const getColorResultado = (porcentajeError) => {
    if (porcentajeError > 50) return "red";
    if (porcentajeError >= 30) return "orange";
    if (porcentajeError > 0) return "yellow";
    return "green"; // solo para 0 exacto
  };



  const guardarVerResultados = () => {
    if (array_respuestas?.length !== id_pregunta + 1) {
      return alert("Marca la ultima pregunta");
    }

    const resultados = calcularResultados();

    const totalPreguntas =
      resultados.respuestas_correctas + resultados.respuestas_incorrectas;

    const porcentajeError =
      totalPreguntas > 0
        ? (resultados.respuestas_incorrectas / totalPreguntas) * 100
        : 0;

    const color = getColorResultado(porcentajeError);

    const datax = {
      usuario_id: user?.id,
      curso_id: curso?.id_curso,
      id_cursos_secciones: 0,
      id_seccion: id_seccion,
      id_tema: array_respuestas[0]?.tema_id_i,
      total_preguntas: resultados.total_preguntas,
      respuestas_correctas: resultados.respuestas_correctas,
      respuestas_incorrectas: resultados.respuestas_incorrectas,
      color_resultado: color,
    };

    console.log(datax);

    createCalificacionMutation.mutate(datax);
    console.log("ver resultados");
    // alert("ver resultados");
  };

  // Avanza a la siguiente pregunta SIN responder (salta las ya marcadas)
  const nextPregunta = () => {
    if (array_preguntas?.[id_pregunta].preg_marcado !== 1) {
      ToastWarningConfirm("Debes marcar una respuesta")
      // alert("Marca una respuesta");
      return;
    }

    const total = array_preguntas?.length || 0;

    // Buscar la siguiente pregunta sin responder a partir de la actual
    for (let i = 1; i < total; i++) {
      const nextIndex = (id_pregunta + i) % total;
      const pregunta = array_preguntas[nextIndex];

      const yaRespondida = array_respuestas.some(
        (r) => r.id_pregunta_i === pregunta.id_pregunta_i,
      );

      if (!yaRespondida) {
        handleSetIdPregunta(nextIndex);
        return;
      }
    }

    // Si todas están respondidas
    alert("Ya respondiste todas las preguntas");
  };

  const opcionSeleccionada = (op) => {
    // console.log(op);

    if (op.resp_correcta_i === 1) {
      const el = document.getElementById(`${op?.id_respuesta_i}`);
      if (el) el.classList.add(styles.correcta);
      // if (el) el.style.backgroundColor = "green";
      ToastSuccess("Respuesta Correcta");
    } else {
      const el = document.getElementById(`${op?.id_respuesta_i}`);
      // if (el) el.style.backgroundColor = "red";
      if (el) el.classList.add(styles.incorrecta);
      ToastError("Respuesta Incorrecta");
    }

    // console.log(respuestasSelected);

    const preguntaActual = array_preguntas?.[id_pregunta];
    const contra = array_respuestas.find(
      // const contra = respuestasSelected.find(
      (p) => p.id_pregunta_i === preguntaActual?.id_pregunta_i,
    );
    if (contra) return;

    const nuevaPregunta = { ...preguntaActual, respuestaSeleccionada: op };
    // console.log(preguntaActual);

    // setRespuestasSelected((prev) => [...prev, nuevaPregunta]);
    dispatch(x_marcarPregunta(array_preguntas?.[id_pregunta].id_pregunta_i));
    dispatch(x_array_respuestas([...array_respuestas, nuevaPregunta]));
  };

  const toggleSidebar = () => {
    dispatch(setOpenSidebarNumeroPreguntas(!open_sidebar_numero_preguntas));
  };

  return (
    <div className={styles.container_page}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.lessonInfo}>
            <div className={styles.progress}>
              Pregunta {id_pregunta + 1} de {array_preguntas?.length}
            </div>
            <div className={styles.divider}></div>
            <h1 className={styles.title}>{tema_preguntas?.desc_corta_t}</h1>
          </div>
          <div className={styles.timerContainer}>
            <Timer />
          </div>
        </div>

        <div className={styles.quizContent}>
          <div className={styles.quizInfo}>
            <div className={styles.quizInstruction}>
              {" "}
              📌 Marca la respuesta correcta.
            </div>
          </div>

          <div className={styles.question}>
            <h2 className={styles.questionText}>
              {array_preguntas?.[id_pregunta]?.pregunta_t}
            </h2>

            {array_preguntas?.[id_pregunta]?.sub_pregunta_v && (
              <pre className={styles.pre}>
                {array_preguntas?.[id_pregunta]?.sub_pregunta_v}
              </pre>
            )}

            <div className={styles.imageContainer}>
              {array_preguntas?.[id_pregunta]?.respuestas?.map(
                (resp, index) => (
                  <p
                    key={resp.id_respuesta_i}
                    id={`${resp?.id_respuesta_i}`}
                    className={styles.alternativa}
                    onClick={() => opcionSeleccionada(resp)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className={styles.letra}>
                      {["🔵", "🔵", "🔵", "🔵", "🔵"][index] || ""})
                    </span>
                    <span className={styles.text_alternativa}>
                      {resp.respuesta_t}
                    </span>
                  </p>
                ),
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <Link
              to={`/candidato/curso/${curso?.id_curso}`}
              className={styles.finishButton}
            >
              <FaStopCircle size={16} /> Terminar Prueba
            </Link>
            {array_preguntas?.length === array_respuestas?.length ? (
              <Link
                to={`/candidato/curso/${curso?.id_curso}/resultados`}
                className={styles.nextButton}
                onClick={() => guardarVerResultados()}
              >
                <FaCheckCircle size={16} /> Ver Resultados
              </Link>
            ) : (
              <button
                className={styles.nextButton}
                onClick={() => nextPregunta()}
              >
                Pregunta Siguiente <FaArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      <SidebarTema
        isVisible={open_sidebar_numero_preguntas}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default TemaPage;
