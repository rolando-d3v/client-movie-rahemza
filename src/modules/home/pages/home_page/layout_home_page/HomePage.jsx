import styles from "./layout_dashboard.module.css";
import PrimerPlano from "../primer_plano/PrimerPlano";
import Carousel from "../carousel/Carousel";
import ListImages from "../lista_img/ListaImages";


export default function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PrimerPlano />
        <Carousel />
        <ListImages />
      
      </main>
    </div>
  );
}
