import { NavLink } from "react-router";
import styles from "./components.module.css";

const NAV_LINKS = [
  { id: "home", text: "Home", href: "/" },
  { id: "dashboard", text: "Dashboard", href: "/home" },
];

export default function NavLinks({ isMobile = false, onItemClick }) {
  return (
    <nav className={isMobile ? styles.mobileNavLinks : styles.desktopNavLinks}>
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.id}
          to={link.href}
          className={({ isActive }) =>
            `${styles.linkItem} ${isActive ? styles.linkActive : ""}`
          }
          onClick={onItemClick}
        >
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
}
