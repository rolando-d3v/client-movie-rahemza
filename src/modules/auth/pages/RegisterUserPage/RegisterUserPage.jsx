import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./RegisterUserPage.module.css";

const RegisterUserPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* ── Logo / Branding ─────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎓</span>
          </div>
          <h1 className={styles.title}>Crear cuenta</h1>
          <p className={styles.subtitle}>
            Únete a Colex y gestiona tu institución educativa
          </p>
        </div>

        {/* ── Separador decorativo ─────────────────────── */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>Datos personales</span>
          <span className={styles.dividerLine} />
        </div>

        {/* ── Formulario ──────────────────────────────── */}
        <RegisterForm />

        {/* ── Footer ──────────────────────────────────── */}
        <div className={styles.footer}>
          <p>
            © {new Date().getFullYear()} Colex. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* ── Background decoration ─────────────────────── */}
      <div className={styles.bg}>
        <div className={`${styles.bgCircle} ${styles.bgCircle1}`} />
        <div className={`${styles.bgCircle} ${styles.bgCircle2}`} />
        <div className={`${styles.bgCircle} ${styles.bgCircle3}`} />
        <div className={`${styles.bgCircle} ${styles.bgCircle4}`} />
      </div>
    </div>
  );
};

export default RegisterUserPage;
