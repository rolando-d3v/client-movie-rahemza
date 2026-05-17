import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";
import walldesk from "../../../../assets/logo/walldesk.jpg";

const LoginPage = () => {
  return (
    <div className={styles.page}>
      {/* ── Fondo y Overlay ───────────────────────────── */}
      <div 
        className={styles.bgImage} 
        style={{ backgroundImage: `url(${walldesk})` }} 
      />
      <div className={styles.bgOverlay} />

      {/* ── Círculos animados ─────────────────────────── */}
      <div className={styles.content_bg}>
        <div className={`${styles.bgCircle} ${styles.bgCircle1}`} />
        <div className={`${styles.bgCircle} ${styles.bgCircle2}`} />
        <div className={`${styles.bgCircle} ${styles.bgCircle3}`} />
      </div>

      {/* ── Login Form a la izquierda ─────────────────── */}
      <div className={styles.content_form}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
