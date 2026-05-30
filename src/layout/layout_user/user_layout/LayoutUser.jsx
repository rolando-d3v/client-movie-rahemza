import styles from "./layout_dashboard.module.css";
import HeadNavegadorHome from "../navigation-web/HeadNavegadorHome";
import { Outlet } from "react-router";
import FooterWeb from "../footer_web/FooterWeb";

export default function LayoutUser() {
  return (
    <main className={styles.dashboard}>
      {/* <div className={styles.promociones}>
        <p className={styles.text_promo}> Nuevas Promociones y Descuentos</p>
      </div> */}
      <HeadNavegadorHome />
      <Outlet />
      <FooterWeb />
    </main>
  );
}
