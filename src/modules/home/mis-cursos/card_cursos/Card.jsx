import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router";

export default function Card({ curso }) {
  return (
    <Link to={"/dashboard"} className={`${styles.card}`}>
      <img
        src={curso?.imagen || "/images/avatar/user.png"}
        alt={curso.titulo}
        width={200}
        height={200}
        className={styles.image}
      />
      <div className={styles.div_text}>
        <h1 className={styles.title}>{curso.titulo}</h1>
      </div>
    </Link>
  );
}
