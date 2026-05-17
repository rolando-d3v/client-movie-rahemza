import styles from "./sidebar_tema.module.css";
import Timer from "../../tema/time/Time";

import ProfileCard from "../profile/Profile";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../../../../redux/store";
import { set_id_pregunta } from "../../../../../redux/slices/cursoSlice";

const SidebarTema = ({ isVisible, toggleSidebar }) => {
  const dispatch = useAppDispatch();

  const { array_preguntas, array_respuestas, id_pregunta } = useAppSelector(
    (state) => state.cursoSlice,
  );

  /**
   * Determina el estado de una pregunta:
   * - "correct"    → respondida correctamente
   * - "incorrect"  → respondida incorrectamente
   * - "current"    → es la pregunta activa
   * - "unanswered" → aún no ha sido respondida
   */
  const getQuestionStatus = (pregunta, index) => {
    const respuesta = array_respuestas.find(
      (r) => r.id_pregunta_i === pregunta.id_pregunta_i,
    );

    if (respuesta) {
      return respuesta.respuestaSeleccionada?.resp_correcta_i === 1
        ? "correct"
        : "incorrect";
    }

    if (index === id_pregunta) return "current";
    return "unanswered";
  };

  /**
   * Solo permite navegar a preguntas que NO han sido respondidas
   */
  const handleNavigate = (index, status) => {
    if (status === "correct" || status === "incorrect") return;
    dispatch(set_id_pregunta(index));
  };

  return (
    <div className={`${styles.sidebar} ${!isVisible ? styles.hidden : ""}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>MODO PRÁCTICA</h2>
        <button onClick={toggleSidebar} className={styles.closeButton}>
          <FaAngleDown />
        </button>
      </div>

      <ProfileCard />

      <div className={styles.quizListContainer}>
        {/* Grid de botones de preguntas */}
        <div className={styles.questionGrid}>
          {array_preguntas?.map((pregunta, index) => {
            const status = getQuestionStatus(pregunta, index);
            const isAnswered = status === "correct" || status === "incorrect";

            return (
              <button
                key={pregunta.id_pregunta_i}
                className={`${styles.questionBtn} ${styles[status]}`}
                onClick={() => handleNavigate(index, status)}
                disabled={isAnswered}
                title={
                  isAnswered
                    ? `Pregunta ${index + 1} - Ya respondida`
                    : `Ir a pregunta ${index + 1}`
                }
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* Leyenda de colores */}
        <h6 className={styles.legendTitle}>Leyenda de preguntas</h6>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span
              className={`${styles.legendDot} ${styles.legendCorrect}`}
            ></span>
            <span className={styles.legendLabel}>Correcta</span>
          </div>
          <div className={styles.legendItem}>
            <span
              className={`${styles.legendDot} ${styles.legendIncorrect}`}
            ></span>
            <span className={styles.legendLabel}>Incorrecta</span>
          </div>
          <div className={styles.legendItem}>
            <span
              className={`${styles.legendDot} ${styles.legendUnanswered}`}
            ></span>
            <span className={styles.legendLabel}>Sin responder</span>
          </div>
          <div className={styles.legendItem}>
            <span
              className={`${styles.legendDot} ${styles.legendCurrent}`}
            ></span>
            <span className={styles.legendLabel}>Actual</span>
          </div>
        </div>
      </div>

      <div className={styles.timerContainer}>
        <Timer />
      </div>
    </div>
  );
};

export default SidebarTema;
