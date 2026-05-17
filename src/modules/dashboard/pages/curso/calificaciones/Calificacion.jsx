import { useState, useMemo } from "react";
import { useCurso } from "../../../hooks/useCurso";
import styles from "./calificacion.module.css";
import { useAuth } from "../../../../auth/hooks/useAuth";

/* ── SVG Icons inline ─────────────────────────────────────── */
const IconBook = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const IconFolder = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const IconChevron = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconClipboard = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const IconEmpty = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 15h8" />
    <circle cx="9" cy="9" r="1" fill="currentColor" />
    <circle cx="15" cy="9" r="1" fill="currentColor" />
  </svg>
);

const IconAlert = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ── Helpers ──────────────────────────────────────────────── */

/** Devuelve solo las últimas N calificaciones (más recientes primero) */
const getLastCalificaciones = (calificaciones = [], limit = 10) => {
  const sorted = [...calificaciones].sort(
    (a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion),
  );
  return sorted.slice(0, limit);
};

/** Formatea fecha ISO → dd/mm/yy HH:mm */
const formatFecha = (iso) => {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${String(d.getFullYear()).slice(-2)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** Label legible para el resultado */
const resultLabel = (color) => {
  switch (color) {
    case "green":
      return "Aprobado";
    case "yellow":
      return "Regular";
    case "red":
      return "Desaprobado";
    default:
      return color;
  }
};

/* ── Sub-components ───────────────────────────────────────── */

function ScoreBar({ correctas, total, color }) {
  const pct = total > 0 ? (correctas / total) * 100 : 0;
  const fillClass =
    color === "green"
      ? styles.score_bar_fill_green
      : color === "yellow"
        ? styles.score_bar_fill_yellow
        : styles.score_bar_fill_red;

  return (
    <div className={styles.score_bar_container}>
      <div className={styles.score_bar}>
        <div className={fillClass} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.score_text}>
        {correctas}/{total}
      </span>
    </div>
  );
}

function ResultBadge({ color }) {
  const cls =
    color === "green"
      ? styles.result_green
      : color === "yellow"
        ? styles.result_yellow
        : styles.result_red;

  const dotCls =
    color === "green"
      ? styles.dot_green
      : color === "yellow"
        ? styles.dot_yellow
        : styles.dot_red;

  return (
    <span className={cls}>
      <span className={dotCls} />
      {resultLabel(color)}
    </span>
  );
}

function EmptyState() {
  return (
    <div className={styles.empty_state}>
      <div className={styles.empty_icon}>
        <IconEmpty />
      </div>
      <p className={styles.empty_text}>Sin calificaciones aún</p>
      <p className={styles.empty_subtext}>
        Resuelve el examen para ver tus resultados
      </p>
    </div>
  );
}

function CalificacionesTable({ calificaciones }) {
  const last5 = getLastCalificaciones(calificaciones);

  if (last5.length === 0) return <EmptyState />;

  return (
    <>
      {/* Desktop Table */}
      <div className={styles.desktop_table}>
        <div className={styles.calificaciones_table_wrapper}>
          <table className={styles.calificaciones_table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Correctas</th>
                <th>Incorrectas</th>
                <th>Progreso</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {last5.map((cal, idx) => (
                <tr
                  key={cal.id}
                  className={`${styles.animate_in} ${styles[`stagger_${idx + 1}`] || ""}`}
                >
                  <td>
                    <span className={styles.attempt_number}>{idx + 1}</span>
                  </td>
                  <td>
                    <span className={styles.fecha}>
                      {formatFecha(cal.fecha_creacion)}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        color: "#16a34a",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <IconCheck /> {cal.respuestas_correctas}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        color: "#dc2626",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <IconX /> {cal.respuestas_incorrectas}
                    </span>
                  </td>
                  <td>
                    <ScoreBar
                      correctas={cal.respuestas_correctas}
                      total={cal.total_preguntas}
                      color={cal.color_resultado}
                    />
                  </td>
                  <td>
                    <ResultBadge color={cal.color_resultado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className={styles.mobile_card}>
        {last5.map((cal, idx) => (
          <div
            key={cal.id}
            className={`${styles.mobile_grade_card} ${styles.animate_in} ${styles[`stagger_${idx + 1}`] || ""}`}
          >
            <div className={styles.mobile_grade_header}>
              <span className={styles.attempt_number}>{idx + 1}</span>
              <ResultBadge color={cal.color_resultado} />
            </div>
            <div className={styles.mobile_grade_row}>
              <span className={styles.mobile_grade_label}>Fecha</span>
              <span className={styles.fecha}>
                {formatFecha(cal.fecha_creacion)}
              </span>
            </div>
            <div className={styles.mobile_grade_row}>
              <span className={styles.mobile_grade_label}>Correctas</span>
              <span
                className={styles.mobile_grade_value}
                style={{ color: "#16a34a" }}
              >
                {cal.respuestas_correctas}
              </span>
            </div>
            <div className={styles.mobile_grade_row}>
              <span className={styles.mobile_grade_label}>Incorrectas</span>
              <span
                className={styles.mobile_grade_value}
                style={{ color: "#dc2626" }}
              >
                {cal.respuestas_incorrectas}
              </span>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <ScoreBar
                correctas={cal.respuestas_correctas}
                total={cal.total_preguntas}
                color={cal.color_resultado}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TemaCard({ tema, index }) {
  const [open, setOpen] = useState(false);
  const hasCalificaciones =
    tema.calificaciones && tema.calificaciones.length > 0;

  return (
    <div className={styles.tema_card}>
      <button
        className={styles.tema_header}
        onClick={() => setOpen(!open)}
        type="button"
        aria-expanded={open}
      >
        <div className={styles.tema_header_left}>
          <span className={styles.tema_number}>{index}</span>
          <p className={styles.tema_name}>{tema.desc_corta_t}</p>
        </div>
        <div className={styles.tema_meta}>
          {hasCalificaciones ? (
            <span className={styles.tema_badge_has}>
              {tema.calificaciones.length}{" "}
              {tema.calificaciones.length === 1 ? "intento" : "intentos"}
            </span>
          ) : (
            <span className={styles.tema_badge_empty}>Sin intentos</span>
          )}
          <span
            className={open ? styles.tema_chevron_open : styles.tema_chevron}
          >
            <IconChevron />
          </span>
        </div>
      </button>

      <div className={open ? styles.tema_body_open : styles.tema_body}>
        <div className={styles.tema_body_inner}>
          <CalificacionesTable calificaciones={tema.calificaciones} />
        </div>
      </div>
    </div>
  );
}

function SeccionCard({ seccion }) {
  const [open, setOpen] = useState(false);
  const temas = seccion.secciones?.tema || [];
  const totalCalificaciones = temas.reduce(
    (sum, t) => sum + (t.calificaciones?.length || 0),
    0,
  );

  return (
    <div className={styles.seccion_card}>
      <button
        className={styles.seccion_header}
        onClick={() => setOpen(!open)}
        type="button"
        aria-expanded={open}
      >
        <div className={styles.seccion_header_left}>
          <div className={styles.seccion_icon}>
            <IconFolder />
          </div>
          <div className={styles.seccion_info}>
            <h3 className={styles.seccion_title}>
              {seccion.secciones?.desc_corta_t}
            </h3>
            <p className={styles.seccion_subtitle}>
              {temas.length} {temas.length === 1 ? "tema" : "temas"} ·{" "}
              {totalCalificaciones}{" "}
              {totalCalificaciones === 1 ? "calificación" : "calificaciones"}
            </p>
          </div>
        </div>
        <div className={styles.seccion_meta}>
          <span className={styles.seccion_count}>
            <IconClipboard />
            {temas.length}
          </span>
          <span className={open ? styles.chevron_open : styles.chevron}>
            <IconChevron />
          </span>
        </div>
      </button>

      <div className={open ? styles.seccion_body_open : styles.seccion_body}>
        <div className={styles.seccion_body_inner}>
          {temas.map((tema, idx) => (
            <TemaCard key={tema.id_tema_i} tema={tema} index={idx + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
function Calificacion() {
  const { useGetCalificaciones, curso } = useCurso();

  const { user } = useAuth();

  const datax = {
    user_id: user?.id,
    curso_id: curso?.id_curso,
  };

  console.log(datax);

  const calificaciones = useGetCalificaciones(datax);

  // Compute summary stats
  const stats = useMemo(() => {
    if (!calificaciones.data?.calificacion_temas) return null;

    let totalSecciones = 0;
    let totalTemas = 0;
    let totalCalificaciones = 0;

    calificaciones.data.calificacion_temas.forEach((item) => {
      const secciones = item.curso?.cursos_secciones || [];
      totalSecciones += secciones.length;
      secciones.forEach((sec) => {
        const temas = sec.secciones?.tema || [];
        totalTemas += temas.length;
        temas.forEach((t) => {
          totalCalificaciones += t.calificaciones?.length || 0;
        });
      });
    });

    return { totalSecciones, totalTemas, totalCalificaciones };
  }, [calificaciones.data]);

  /* Loading */
  if (calificaciones.isLoading) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.spinner} />
        <span className={styles.loading_text}>Cargando calificaciones…</span>
      </div>
    );
  }

  /* Error */
  if (calificaciones.isError) {
    return (
      <div className={styles.error_container}>
        <div className={styles.error_icon}>
          <IconAlert />
        </div>
        <p className={styles.error_text}>Error al cargar calificaciones</p>
      </div>
    );
  }

  const data = calificaciones.data?.calificacion_temas || [];

  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {data.map((item) => {
        const curso = item.curso;
        const secciones = curso?.cursos_secciones || [];

        return (
          <div key={item.id_personal_curso_i}>
            {/* ── Curso Header ──────────────────── */}
            <div className={styles.curso_header}>
              <div className={styles.curso_header_content}>
                {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} > */}
                  {/* <div> */}
                    <h2 className={styles.curso_title}> {curso?.titulo}</h2>
                    <p className={styles.curso_description}>
                      {curso?.descripcion}
                    </p>
                  {/* </div> */}
                  {/* <div className={styles.curso_badge}>
                    <IconBook />
                    Curso
                  </div> */}
                {/* </div> */}

                {stats && (
                  <div className={styles.curso_stats}>
                    <div className={styles.stat_item}>
                      <div className={styles.stat_icon_sections}>
                        <IconFolder />
                      </div>
                      <div>
                        <span className={styles.stat_value}>
                          {stats.totalSecciones}
                        </span>
                        <span className={styles.stat_label}>Secciones</span>
                      </div>
                    </div>
                    <div className={styles.stat_item}>
                      <div className={styles.stat_icon_topics}>
                        <IconClipboard />
                      </div>
                      <div>
                        <span className={styles.stat_value}>
                          {stats.totalTemas}
                        </span>
                        <span className={styles.stat_label}>Temas</span>
                      </div>
                    </div>
                    <div className={styles.stat_item}>
                      <div className={styles.stat_icon_grades}>
                        <IconCheck />
                      </div>
                      <div>
                        <span className={styles.stat_value}>
                          {stats.totalCalificaciones}
                        </span>
                        <span className={styles.stat_label}>Intentos</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Secciones ────────────────────── */}
            {secciones.map((sec) => (
              <SeccionCard key={sec.id_cursos_secciones_i} seccion={sec} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Calificacion;
