import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router";
import imgCourse from '../../../../../assets/logo/card.jpg'

export default function Card({ curso }) {
  return (
    <Link
      to={`/candidato/curso/${curso?.id_curso}`}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <img
          src={imgCourse || "/images/card/prisma.png"}
          alt={curso.titulo}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <span className={styles.viewCourseText}>Ver Curso</span>
        </div>
      </div>
      <div className={styles.content}>
        <span className={styles.badge}>Curso</span>
        <h1 className={styles.title}>{curso.titulo}</h1>
      </div>
    </Link>
  );
}
