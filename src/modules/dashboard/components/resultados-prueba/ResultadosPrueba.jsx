import * as FaIcons from "react-icons/fa";
import styles from "./resultados.module.css";
import { Link } from "react-router";
import { useCurso } from "../../hooks/useCurso";

const ResultadoComponent = ({ array_respuestas }) => {
  const correctCount =
    array_respuestas?.filter(
      (q) => q.respuestaSeleccionada?.resp_correcta_i === 1,
    ).length || 0;
  const incorrectCount =
    array_respuestas?.filter(
      (q) => q.respuestaSeleccionada?.resp_correcta_i === 0,
    ).length || 0;
  const totalCount = array_respuestas?.length || 0;

  const { curso } = useCurso();

  return (
    <div className={styles.quizContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.bookTitle}>
          <FaIcons.FaClipboardList className={styles.bookIcon} /> Resumen de
          Resultados
        </h2>
        <Link
          to={`/candidato/curso/${curso?.id_curso}`}
          className={styles.finishButton}
        >
          <FaIcons.FaStopCircle size={16} /> Ir al curso
        </Link>
      </div>

      {/* Score Section */}
      <div className={styles.scoreBoard}>
        <div className={`${styles.scoreCard} ${styles.totalCard}`}>
          <div className={styles.scoreIcon}>
            <FaIcons.FaClipboardList />
          </div>
          <div className={styles.scoreInfo}>
            <span className={styles.scoreValue}>{totalCount}</span>
            <span className={styles.scoreLabel}>Total Preguntas</span>
          </div>
        </div>

        <div className={`${styles.scoreCard} ${styles.correctCard}`}>
          <div className={styles.scoreIcon}>
            <FaIcons.FaCheckCircle />
          </div>
          <div className={styles.scoreInfo}>
            <span className={styles.scoreValue}>{correctCount}</span>
            <span className={styles.scoreLabel}>Respuestas Correctas</span>
          </div>
        </div>

        <div className={`${styles.scoreCard} ${styles.incorrectCard}`}>
          <div className={styles.scoreIcon}>
            <FaIcons.FaTimesCircle />
          </div>
          <div className={styles.scoreInfo}>
            <span className={styles.scoreValue}>{incorrectCount}</span>
            <span className={styles.scoreLabel}>Respuestas Incorrectas</span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className={styles.questionsContainer}>
        {array_respuestas?.map((question) => (
          <div key={question.id_pregunta_i} className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>
                Pregunta {question.nro_pregunta_i}
              </span>
              <div className={styles.questionStatus}>
                <span
                  className={`${styles.statusIncorrect} ${
                    question.respuestaSeleccionada?.resp_correcta_i === 0
                      ? styles.statusIncorrect
                      : styles.statusCorrect
                  }`}
                >
                  {question.respuestaSeleccionada?.resp_correcta_i === 0
                    ? "Incorrecta"
                    : "Correcta"}
                </span>
              </div>
            </div>

            <div className={styles.questionContent}>
              <h3 className={styles.questionText}>{question.pregunta_t}</h3>

              <div className={styles.optionsContainer}>
                {question?.respuestas?.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`${styles.option} 
                    ${option.resp_correcta_i === 1 ? styles.correctOption : ""}
                    `}
                  >
                    <span className={styles.optionLetter}>
                      {String.fromCharCode(97 + optionIndex)}.
                    </span>
                    <span className={styles.optionText}>
                      {option.respuesta_t}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className={`  ${styles.correctAnswerBox}  ${
                  question.respuestaSeleccionada?.resp_correcta_i === 0
                    ? styles.selectedIncorrect
                    : ""
                } 
                ${
                  question.respuestaSeleccionada?.resp_correcta_i === 1
                    ? styles.correctOption
                    : ""
                }
                `}
              >
                {question.respuestaSeleccionada?.resp_correcta_i === 0 ? (
                  <FaIcons.FaTimesCircle className={styles.incorrectIcon} />
                ) : (
                  <FaIcons.FaCheckCircle className={styles.correctIcon} />
                )}
                <span>
                  La respuesta seleccionada es:{" "}
                  <strong>
                    {" "}
                    {question.respuestaSeleccionada?.respuesta_t}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultadoComponent;
