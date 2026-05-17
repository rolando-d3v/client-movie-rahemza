import styles from "./layout_dashboard.module.css";
import PrimerPlano from "./ui/primer_plano/PrimerPlano";
import Carousel from "./ui/carousel/Carousel";
import ListImages from "./ui/lista_img/ListaImages";
import Footer from "./ui/footer/Footer";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PrimerPlano />
        <Carousel />
        <ListImages />
        <Footer />
      </main>
    </div>
  );
}
