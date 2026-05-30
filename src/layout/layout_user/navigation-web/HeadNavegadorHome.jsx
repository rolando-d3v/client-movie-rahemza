import { Link, useNavigate } from "react-router";
import styles from "./headNave.module.css";
import * as Faicons from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { fetchSearchMovies, fetchTrendingMovies } from "../../../modules/movie/services/movie";

import { useTranslation } from "react-i18next";
import LogoutButton from "../../../components/boton_logout/Boton";
import { useAuth } from "../../../modules/auth/hooks/useAuth";
import { authClient } from "../../../config/auth-client";

export default function HeadNavegadorHome() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const avatarMenuRef = useRef(null);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { isAuthenticated } = useAuth();
  const { data: session } = authClient.useSession();
  const googleUser = session?.user;

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
    setResults([]);
  };

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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cerrar menú avatar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
        setShowAvatarMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const movies = await fetchTrendingMovies();
    console.log(movies);
    // setResults(movies.results);
  };

  const getSearchMovies = (e) => {
    const value = e.target.value;
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: value,
        include_adult: "false",
        language: "es-mx",
        page: "1",
      }).then((data) => {
        setLoading(false);
        console.log("Películas encontradas (API TMDB):", data);
        if (data && data.results) {
          setResults(data.results);
        }
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  return (
    <header className={`${styles.header_container} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.div_interno}>
        <section className={styles.content_logo}>
          <Link to="/" className={styles.nav_logo}>
            <div className={styles.logo_content}>
              <img className={styles.logo} src="/images/logos/logo_rahemsa.png" alt="logo_app" width={46} height={46} />
            </div>
            <p className={styles.title_sistema}>Rahemza</p>
          </Link>
        </section>
        {/* buttom para abrir el sidebar */}
        <button className={styles.button_open_movil} onClick={() => toggleSidebar()}>
          <Faicons.FaBars className={styles.icon_bars} />
        </button>

        {/* header escritorio */}
        <article className={`${styles.nav_seccion_desktop}`}>
          {/* links de la navegacion */}
          <div className={styles.content_links}>
            <Link to={"/dashboard"} className={styles.link_item}>
              Dashboard
            </Link>

            {linksNavegacion.map((li, index) => {
              return (
                <Link to={li.href} key={index} className={styles.link_item} onClick={toggleSidebar}>
                  {li.text}
                </Link>
              );
            })}
          </div>
          {/* nav lado derecho */}
          <div className={styles.nav_avatar}>
            <div className={styles.search_container}>
              <Faicons.FaSearch className={styles.search_icon} />
              <input onChange={getSearchMovies} placeholder="Películas, series, etc..." className={styles.input_search} />
              {results.length > 0 && (
                <ul className={styles.search_results}>
                  {results.slice(0, 5).map((movie) => (
                    <li key={movie.id} className={styles.search_item} onClick={() => handleMovieClick(movie.id)}>
                      {movie.title || movie.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {isAuthenticated ? (
              <div className={styles.content_links}>
                {/* Avatar Google Style */}
                <div className={styles.google_avatar_wrapper} ref={avatarMenuRef}>
                  <button
                    className={styles.avatar_button}
                    onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                    aria-label="Cuenta de usuario"
                  >
                    {googleUser?.image ? (
                      <img
                        src={googleUser.image}
                        alt={googleUser.name || "Usuario"}
                        className={styles.avatar_img}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className={styles.avatar_fallback}>
                        {(googleUser?.name?.[0] || "U").toUpperCase()}
                      </div>
                    )}
                  </button>

                  {/* Dropdown menú estilo Google */}
                  {showAvatarMenu && (
                    <div className={styles.avatar_dropdown}>
                      <div className={styles.dropdown_header}>
                        <div className={styles.dropdown_avatar_large}>
                          {googleUser?.image ? (
                            <img
                              src={googleUser.image}
                              alt={googleUser.name || "Usuario"}
                              className={styles.avatar_img_large}
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className={styles.avatar_fallback_large}>
                              {(googleUser?.name?.[0] || "U").toUpperCase()}
                            </div>
                          )}
                        </div>
                        <p className={styles.dropdown_name}>{googleUser?.name || "Usuario"}</p>
                        <p className={styles.dropdown_email}>{googleUser?.email || ""}</p>
                      </div>

                      <div className={styles.dropdown_divider} />

                      <div className={styles.dropdown_links}>
                        <Link
                          to="/perfil"
                          className={styles.dropdown_item}
                          onClick={() => setShowAvatarMenu(false)}
                        >
                          <Faicons.FaUser className={styles.dropdown_icon} />
                          Mi Perfil
                        </Link>
                        {linksNavegacion.map((li, index) => (
                          <Link
                            to={li.href}
                            key={index}
                            className={styles.dropdown_item}
                            onClick={() => {
                              setShowAvatarMenu(false);
                              toggleSidebar();
                            }}
                          >
                            <Faicons.FaHome className={styles.dropdown_icon} />
                            {li.text}
                          </Link>
                        ))}
                      </div>

                      <div className={styles.dropdown_divider} />

                      <div className={styles.dropdown_footer}>
                        <LogoutButton />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link to="/login" className={styles.inicio_sesion}>
                <strong>{t("login_page.login")} </strong>
              </Link>
            )}
          </div>
        </article>

        {/* *************************************************************************************** */}
        {/* *************************************************************************************** */}
        {/* *************************************************************************************** */}
        {/* *************************************************************************************** */}
        {/* *************************************************************************************** */}
        {/* *************************************************************************************** */}
        {/* *************************************************************************************** */}
        {/* *************************************************************************************** */}
        {/* header movil */}
        <article className={`${styles.nav_seccion_movil} ${isOpen ? styles.open : ""}`}>
          {/* links de la navegacion */}
          <div className={styles.content_links}>
            <Link to={"/dashboard"} className={styles.link_item}>
              Dashboard
            </Link>
            {linksNavegacion.map((li, index) => {
              return (
                <Link to={li.href} key={index} className={styles.link_item} onClick={() => setIsOpen(false)}>
                  {li.text}
                </Link>
              );
            })}
          </div>

          <div className={styles.search_container_movil}>
            <Faicons.FaSearch className={styles.search_icon} />
            <input onChange={getSearchMovies} placeholder="Buscar película..." className={styles.input_search} />
            {results.length > 0 && (
              <ul className={styles.search_results}>
                {results.slice(0, 5).map((movie) => (
                  <li key={movie.id} className={styles.search_item} onClick={() => handleMovieClick(movie.id)}>
                    {movie.title || movie.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.nav_avatar}>
            <Link to="/login" className={styles.inicio_sesion} onClick={() => setIsOpen(false)}>
              <strong>Iniciar Sesión</strong>
            </Link>
          </div>
        </article>
      </div>
    </header>
  );
}
