import { useState } from "react";
import styles from "./layout_dashboard.module.css";
import { Sidebar } from "../sidebar/Sidebar";
import * as FaIcons from "react-icons/fa6";
import { Outlet, useMatch } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { FaAngleDown } from "react-icons/fa";
import { setOpenSidebarNumeroPreguntas } from "../../../../redux/slices/estateSlice";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isTemaPage = useMatch("/candidato/curso/:id_curso/tema/:id_tema");

  const { open_sidebar_numero_preguntas } = useAppSelector(
    (state) => state.stateSlice,
  );
  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const toggleSidebarPreguntas = () => {
    dispatch(setOpenSidebarNumeroPreguntas(!open_sidebar_numero_preguntas));
  };

  return (
    <main className={styles.dashboard}>
      <div className={styles.content}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={styles.div_children}>
          <Outlet />
        </div>
        <div className={styles.mobile_menu}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleSidebar}
            aria-label="Abrir menú"
          >
            <FaIcons.FaBars className={styles.fa_icon} />
          </button>
          {isTemaPage && (
            <button
              type="button"
              onClick={toggleSidebarPreguntas}
              className={styles.btn_lista_preguntas}
              title="Abrir Navegación de Preguntas"
            >
              <span>Navegación de preguntas</span>
              <FaAngleDown />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
