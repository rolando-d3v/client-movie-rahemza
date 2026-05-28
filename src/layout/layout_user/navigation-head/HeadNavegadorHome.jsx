import { Link } from "react-router";
// import ToggleTheme from "../toggle_theme/ToggleTheme";
import styles from "./headNave.module.css";
import * as Faicons from "react-icons/fa";
import { useEffect, useState } from "react";
import LogoutButton from "../../../components/boton_logout/Boton";

export default function HeadNavegadorHome() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const linksNavegacion = [
    {
      id: 0,
      text: "Home",
      href: "/",
      src_icon: "https://cdn.lordicon.com/kxoxiwrf.json",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <header className={`${styles.header_container}`}>
      <div className={styles.div_interno}>
        <section className={styles.content_logo}>
          <Link to="/" className={styles.nav_logo}>
            <div className={styles.logo_content}>
              <img
                className={styles.logo}
                src="/images/logos/logo_rahemsa.png"
                alt="logo_app"
                width={46}
                height={46}
              />
            </div>
            <p className={styles.title_sistema}>Rahemza Cinemas</p>
          </Link>
        </section>
        {/* buttom para abrir el sidebar */}
        <button
          className={styles.button_open_movil}
          onClick={() => toggleSidebar()}
        >
          <Faicons.FaBars className={styles.icon_bars} />
        </button>

        {/* header escritorio */}
        <article className={`${styles.nav_seccion_desktop}`}>
          {/* links de la navegacion */}
          {/* <div className={styles.content_links}>
            <Link to={"/dashboard"} className={styles.link_item}>
              Dashboard
            </Link>

            {linksNavegacion.map((li, index) => {
              return (
                <Link
                  to={li.href}
                  key={index}
                  className={styles.link_item}
                  onClick={toggleSidebar}
                >
                  {li.text}
                </Link>
              );
            })}
          </div> */}
          {/* nav lado derecho */}
          <div className={styles.nav_avatar}>
            {/* <ToggleTheme /> */}
            <Link to="/login" className={styles.inicio_sesion}>
              <strong>Iniciar Sesion</strong>
            </Link>
          </div>
        </article>

        {/* header movil */}
        <article
          className={`${styles.nav_seccion_movil} ${isOpen ? styles.open : ""}`}
        >
          {/* links de la navegacion */}
          <div className={styles.content_links}>
            <Link to={"/dashboard"} className={styles.link_item}>
              Dashboard
            </Link>
            {linksNavegacion.map((li, index) => {
              return (
                <Link
                  to={li.href}
                  key={index}
                  className={styles.link_item}
                  onClick={() => setIsOpen(false)}
                >
                  {li.text}
                </Link>
              );
            })}
          </div>

          {/* nav lado derecho */}
          <div className={styles.nav_avatar}>
            {/* <ToggleTheme /> */}
            <Link
              to="/login"
              className={styles.inicio_sesion}
              onClick={() => setIsOpen(false)}
            >
              <strong>Iniciar Sesion</strong>
            </Link>
          </div>
        </article>
        <LogoutButton/>
      </div>
    </header>
  );
}
