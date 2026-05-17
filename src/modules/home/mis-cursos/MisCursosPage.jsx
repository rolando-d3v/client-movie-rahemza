import styles from "./page_miscursos.module.css";
import Card from "./card_cursos/Card";

export default function MisCursosPage() {
  const cursos = [
    {
      id: 1,
      titulo: "Curso de Next.js",
      descripcion: "Aprende Next.js desde cero",
      imagen: "/images/card/prisma.png",
    },
    {
      id: 2,
      titulo: "Curso de React",
      descripcion: "Aprende Next.js desde cero",
      imagen: "/images/card/server.png",
    },
    {
      id: 3,
      titulo: "Curso de Electron",
      descripcion: "Aprende Next.js desde cero",
      imagen: "/images/card/server.png",
    },
    {
      id: 4,
      titulo: "Curso de Express",
      descripcion: "Aprende Next.js desde cero",
      imagen: "/images/card/prisma.png",
    },
    {
      id: 5,
      titulo: "Curso de Express",
      descripcion: "Aprende Next.js desde cero",
      imagen: "/images/card/server.png",
    },
  ];

  return (
    <div className={styles.mis_cursos}>
      <div className={styles.list_card}>
        {cursos.map((curso, index) => {
          return (
            <Card key={index} curso={curso} />
          );
        })}
      </div>
    </div>
  );
}
