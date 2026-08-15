import { useState, useEffect } from "react";
import * as Faicons from "react-icons/fa";
import NavLogo from "./components/NavLogo";
import NavLinks from "./components/NavLinks";
import NavSearch from "./components/NavSearch";
import NavUserMenu from "./components/NavUserMenu";
import MobileDrawer from "./components/MobileDrawer";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <NavLogo />

        {/* Desktop Navigation */}
        <div className={styles.desktopSection}>
          <NavLinks />
          <NavSearch />
          <NavUserMenu />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={styles.mobileToggleBtn}
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Abrir menú de navegación"
        >
          <Faicons.FaBars />
        </button>

        {/* Mobile Drawer (reutiliza los mismos subcomponentes) */}
        <MobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </header>
  );
}
