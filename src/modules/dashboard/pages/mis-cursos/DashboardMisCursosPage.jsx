import styles from "./page_miscursos.module.css";
import Card from "./card_cursos/Card";
import { useGetMisCursos } from "../../services/CursoService";
import { useSelector } from "react-redux";

export default function DashboardMisCursosPage() {


  const { user } = useSelector((state) => state.authSlice);
  const id = user?.id;

  const mis_cursos = useGetMisCursos(id);

  console.log(mis_cursos?.data);

  return (
    <div className={styles.mis_cursos}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mis cursos</h1>
        <p className={styles.subtitle}>
          Continúa tu aprendizaje y explora tus cursos inscritos.
        </p>
      </header>
      <div className={styles.list_card}>
        {mis_cursos?.data?.map((curso, index) => {
          return (
            <Card key={index} curso={curso} />
          );
        })}
      </div>
    </div>
  );
}
