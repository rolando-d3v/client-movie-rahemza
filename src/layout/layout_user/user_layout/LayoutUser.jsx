import styles from "./layout_dashboard.module.css";
import Navbar from "../navbar";
import { Outlet } from "react-router";
import FooterWeb from "../footer_web/FooterWeb";

export default function LayoutUser() {
  return (
    <main className={styles.dashboard}>
      <Navbar />
      <Outlet />
      <FooterWeb />
    </main>
  );
}
