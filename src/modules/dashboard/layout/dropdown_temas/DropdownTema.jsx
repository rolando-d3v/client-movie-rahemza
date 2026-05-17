import * as FaIcon from "react-icons/fa";
import { useEffect, useState } from "react";
import styles from "./dropdown.module.css";
import { Link } from "react-router";
import { useAppDispatch } from "../../../../redux/store";
import {
  x_array_preguntas,
  x_array_respuestas,
  x_tema_preguntas,
} from "../../../../redux/slices/cursoSlice";
import { setTimePreguntas } from "../../../../redux/slices/estateSlice";

const DropdownTemas = ({ curso, hasCursoActivo, toggleSidebar }) => {
  const [clicked, setClicked] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  // console.log(curso);

  const dispatch = useAppDispatch();

  const toggleDrop = (index) => {
    setClicked(index?.secciones?.id_secciones_i);
    if (clicked === index?.secciones?.id_secciones_i) {
      setClicked(0);
    }
  };

  const toggleDropItem = (tema) => {
    console.log(tema);

    dispatch(x_tema_preguntas(tema));
    dispatch(setTimePreguntas({ hours: 0, minutes: 0, seconds: 0 }));
    if (width <= 768) {
      toggleSidebar();
    }

    function mezclarArray(array) {
      const copia = [...array];
      for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
      }
      return copia;
    }

    const preguntasMezcladas = tema.preguntas.map((pregunta) => {
      return {
        ...pregunta,
        respuestas: mezclarArray(pregunta.respuestas),
      };
    });

    // console.log(preguntasMezcladas);

    dispatch(x_array_preguntas(preguntasMezcladas));
    dispatch(x_array_respuestas([]));
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("Ancho de la ventana:", width);

  return (
    <div className={styles.quizList}>
      <div className={styles.cursoHeader}>
        <Link
          to={"/candidato/mis-cursos"}
          className={styles.btn_logout_curso}
          onClick={() => hasCursoActivo()}
        >
          Salir del Curso
        </Link>
      </div>
      {curso?.cursos_secciones?.map((drop, index) => {
        return (
          <div key={index}>
            <div
              className={`${styles.headContent} ${
                clicked === drop?.secciones?.id_secciones_i
                  ? styles.clickHead
                  : ""
              }`}
              onClick={() => toggleDrop(drop)}
            >
              <div className={styles.headLeft}>
                {clicked === drop?.secciones.id_secciones_i ? (
                  <FaIcon.FaChevronUp className={styles.chevronIcon} />
                ) : (
                  <FaIcon.FaChevronDown className={styles.chevronIcon} />
                )}
                <h5 className={styles.titulo_seccion}>
                  {drop?.secciones?.desc_corta_t}
                </h5>
              <img
                src={drop?.secciones?.url_img}
                alt={drop?.secciones?.desc_corta_t}
                className={styles.headImg}
              />
              </div>
            </div>

            {clicked === drop?.secciones?.id_secciones_i && (
              <div
                className={`${styles.dropdown_item1} 
                    ${clicked === drop?.secciones?.id_secciones_i && styles.clickHead2}
                      `}
              >
                {drop?.secciones?.tema?.map((drop_item, index) => {
                  return (
                    <Link
                      key={index}
                      className={`${styles.link_item} `}
                      to={`/candidato/curso/${curso?.id_curso}/tema/${drop_item?.id_tema_i}`}
                      onClick={() => {
                        toggleDropItem(drop_item);
                      }}
                    >
                      <span className={styles.linea_horizontal}></span>
                      <span className={styles.text}>
                        {drop_item?.desc_corta_t}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DropdownTemas;
