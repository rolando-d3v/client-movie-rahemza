import styles from "./layout_dashboard.module.css";
import HeadNavegadorHome from "./ui/navigation-head/HeadNavegadorHome";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <main className={styles.dashboard}>
      {/* <div className={styles.promociones}>
        <p className={styles.text_promo}> Nuevas Promociones y Descuentos</p>
      </div> */}
      <HeadNavegadorHome />
      <Outlet />
    </main>
  );
}
