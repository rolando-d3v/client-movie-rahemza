import { Link } from "react-router";
import styles from "./components.module.css";

export default function NavLogo({ onClick }) {
  return (
    <div className={styles.logoContainer}>
      <Link to="/" className={styles.navLogo} onClick={onClick}>
        <div className={styles.logoWrapper}>
          <img
            className={styles.logoImg}
            src="/images/logos/logo_rahemsa.png"
            alt="Rahemza Logo"
            width={42}
            height={42}
          />
        </div>
        <span className={styles.logoTitle}>Rahemza</span>
      </Link>
    </div>
  );
}
