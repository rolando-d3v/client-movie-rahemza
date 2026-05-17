import React from "react";
import * as FaIcons from "react-icons/fa";
import styles from "./resultados.module.css";

const ResultadoComponent = ({ array_respuestas }) => {
  console.log(array_respuestas);

  return (
    <div className={styles.quizContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.bookTitle}>
        </div>
      </div>

      {/* Status Section */}
      <div className={styles.statusSection}>
        <div className={styles.statusGrid}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Resultado de la prueba</span>
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
