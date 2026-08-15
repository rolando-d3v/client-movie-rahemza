import { useEffect } from "react";
import * as Faicons from "react-icons/fa";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavSearch from "./NavSearch";
import NavUserMenu from "./NavUserMenu";
import styles from "./components.module.css";

export default function MobileDrawer({ isOpen, onClose }) {
  // Bloquear scroll de la página cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.drawerOverlay} onClick={onClose}>
      <aside
        className={`${styles.drawerContent} ${isOpen ? styles.drawerOpen : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.drawerHeader}>
          <NavLogo onClick={onClose} />
          <button
            className={styles.drawerCloseBtn}
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <Faicons.FaTimes />
          </button>
        </div>

        <div className={styles.drawerBody}>
          <NavSearch isMobile onSelectMovie={onClose} />
          <div className={styles.drawerDivider} />
          <NavLinks isMobile onItemClick={onClose} />
          <div className={styles.drawerDivider} />
          <NavUserMenu isMobile onAction={onClose} />
        </div>
      </aside>
    </div>
  );
}
