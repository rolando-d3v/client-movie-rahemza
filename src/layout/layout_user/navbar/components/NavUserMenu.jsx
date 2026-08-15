import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import * as Faicons from "react-icons/fa";
import { useAuth } from "../../../../modules/auth/hooks/useAuth";
import { authClient } from "../../../../config/auth-client";
import LogoutButton from "../../../../components/boton_logout/Boton";
import styles from "./components.module.css";

export default function NavUserMenu({ isMobile = false, onAction }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef(null);
  const { isAuthenticated, user } = useAuth();
  const { data: session } = authClient.useSession();
  const currentUser = session?.user || user;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setShowDropdown(false);
    if (onAction) onAction();
  };

  if (!isAuthenticated) {
    return (
      <div className={isMobile ? styles.authContainerMobile : styles.authContainer}>
        <Link to="/login" className={styles.loginBtn} onClick={handleLinkClick}>
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  // Vista Móvil simple
  if (isMobile) {
    return (
      <div className={styles.mobileUserSection}>
        <div className={styles.mobileUserInfo}>
          {currentUser?.image ? (
            <img
              src={currentUser.image}
              alt={currentUser.name || "Usuario"}
              className={styles.mobileAvatarImg}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className={styles.mobileAvatarFallback}>
              {(currentUser?.name?.[0] || currentUser?.email?.[0] || "U").toUpperCase()}
            </div>
          )}
          <div className={styles.mobileUserDetails}>
            <p className={styles.mobileUserName}>{currentUser?.name || "Usuario"}</p>
            <p className={styles.mobileUserEmail}>{currentUser?.email || ""}</p>
          </div>
        </div>
        <div className={styles.mobileUserActions}>
          <Link to="/perfil" className={styles.mobileProfileLink} onClick={handleLinkClick}>
            <Faicons.FaUser /> Mi Perfil
          </Link>
          <div className={styles.mobileLogoutWrapper}>
            <LogoutButton />
          </div>
        </div>
      </div>
    );
  }

  // Vista Desktop con Dropdown tipo Google
  return (
    <div className={styles.userMenuWrapper} ref={menuRef}>
      <button
        className={styles.avatarBtn}
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Menú de usuario"
        aria-expanded={showDropdown}
      >
        {currentUser?.image ? (
          <img
            src={currentUser.image}
            alt={currentUser.name || "Usuario"}
            className={styles.avatarImg}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className={styles.avatarFallback}>
            {(currentUser?.name?.[0] || currentUser?.email?.[0] || "U").toUpperCase()}
          </div>
        )}
      </button>

      {showDropdown && (
        <div className={styles.dropdownPanel}>
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownAvatarLarge}>
              {currentUser?.image ? (
                <img
                  src={currentUser.image}
                  alt={currentUser.name || "Usuario"}
                  className={styles.avatarImgLarge}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className={styles.avatarFallbackLarge}>
                  {(currentUser?.name?.[0] || currentUser?.email?.[0] || "U").toUpperCase()}
                </div>
              )}
            </div>
            <p className={styles.dropdownName}>
              {currentUser?.name || currentUser?.nikname || "Usuario"}
            </p>
            <p className={styles.dropdownEmail}>{currentUser?.email || ""}</p>
          </div>

          <div className={styles.dropdownDivider} />

          <div className={styles.dropdownLinks}>
            <Link to="/perfil" className={styles.dropdownItem} onClick={handleLinkClick}>
              <Faicons.FaUser className={styles.dropdownIcon} />
              <span>Mi Perfil</span>
            </Link>
            <Link to="/home" className={styles.dropdownItem} onClick={handleLinkClick}>
              <Faicons.FaHome className={styles.dropdownIcon} />
              <span>Dashboard</span>
            </Link>
          </div>

          <div className={styles.dropdownDivider} />

          <div className={styles.dropdownFooter}>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
