import styles from "./sibebar.module.css";
import { Link } from "react-router";
import * as FaIcons from "react-icons/fa";
import { useAuth } from "../../../auth/hooks/useAuth";
import { DynamicIcon } from "./DynamicIcon";
import { useCurso } from "../../hooks/useCurso";
import DropdownTemas from "../dropdown_temas/DropdownTema";
import icon from "../../../../assets/logo/walldesk.jpg";

const navItems = [
  {
    icon: <FaIcons.FaHome className={styles.svg} />,
  },
];

const Header = ({ user }) => (
  <header className={styles.sidebar_right_header}>
    <div>
      <div className={styles.sidebar_right_header_inner}>
        <div className={styles.brand_icon}>
          <img src={icon} alt="icon" />
        </div>
        <h1 className={styles.brand_title}>Examen App</h1>
      </div>
      <p className={styles.name_user}>
        {user?.name
          ? `${user?.ap_paterno ? user.ap_paterno.charAt(0).toUpperCase() + user.ap_paterno.slice(1).toLowerCase() : ""} ${user?.ap_materno ? user.ap_materno.charAt(0).toUpperCase() + user.ap_materno.slice(1).toLowerCase() : ""} ${user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}`.trim()
          : "Usuario"}
      </p>
    </div>
  </header>
);

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { activeRole, handleLogout, user } = useAuth();

  console.log(user);

  const { curso, curso_activo, useGetCurso, hasCursoActivo } = useCurso();

  const CURSO = useGetCurso(curso?.id_curso);

  if (CURSO.isLoading || CURSO.isPending) {
    console.log("Cargando curso...");
  }

  // console.log(CURSO?.data);

  return (
    <section className={` ${styles.page}   ${styles.sidebar_8_page}`}>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.show_backdrop : ""}`}
        onClick={toggleSidebar}
      />
      <aside className={`${styles.sidebar_8} ${isOpen ? styles.side : ""}`}>
        {/* sidebar menu */}
        <div className={styles.sidebar_left}>
          <span className={styles.sidebar_8_dots} />
          <Link to={"/dashboard"}>
            <img
              src="/images/logos/logo_rahemsa.png"
              width={40}
              height={40}
              alt="logo"
            />
          </Link>
          {navItems.map((item, i) => (
            <Link to={"/dashboard"} key={i} className={styles.left_link}>
              {" "}
              {item.icon}{" "}
            </Link>
          ))}
          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleSidebar}
            aria-label="Abrir menú"
          >
            <FaIcons.FaBars className={styles.fa_icon} />
          </button>
        </div>
        {/* sidebar lista */}
        <div className={styles.sidebar_right}>
          <div className={styles.sidebar_right_inner}>
            <Header user={user} />
            <div className={styles.menu}>
              {curso_activo === true ? (
                <DropdownTemas
                  curso={CURSO?.data}
                  hasCursoActivo={hasCursoActivo}
                  toggleSidebar={toggleSidebar}
                />
              ) : (
                <nav>
                  {activeRole?.role?.opciones.map((item, i) => (
                    <Link
                      key={i}
                      to={item.url_opcion}
                      type="button"
                      className={styles.right_link}
                    >
                      {item?.icon ? (
                        <DynamicIcon iconName={item?.icon} />
                      ) : (
                        "📁"
                      )}
                      <p>{item.desc_larga_v}</p>
                    </Link>
                  ))}
                </nav>
              )}
            </div>
            <div className={styles.logoutContainer}>
              <button
                type="button"
                className={styles.logout_btn}
                onClick={handleLogout}
              >
                <FaIcons.FaSignOutAlt /> Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};
