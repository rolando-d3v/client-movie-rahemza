import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import styles from "./UnauthorizedPage.module.css";

/**
 * Página mostrada cuando un usuario intenta acceder a una ruta
 * para la cual no tiene permisos.
 */
const UnauthorizedPage = () => {
  const { isAuthenticated, handleLogout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🔒</div>
        <h1 className={styles.title}>Acceso No Autorizado</h1>
        <p className={styles.text}>
          No tienes permisos para acceder a esta sección del sistema.
        </p>
        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => window.history.back()}
          >
            Volver
          </button>
          <button className={styles.btnOutline} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
