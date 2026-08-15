import { createBrowserRouter } from "react-router";
import PublicRoute from "./guards/PublicRoute";
import PrivateRoute from "./guards/PrivateRoute";

// Layouts
import LayoutUser from "../layout/layout_user/user_layout/LayoutUser";

//routes public
import LoginPage from "../modules/auth/pages/login/LoginPage";
import HomePage from "../modules/home/pages/home_page/layout_home_page/HomePage";
import LayoutMovie from "../modules/movie/pages/profile_movie/LayoutMovie";

//routes private users

import LayoutUserPage from "../modules/user/pages/user_home_page/layout/LayoutUserPage";

// ─── Placeholder para páginas aún no implementadas ──────────
const ComingSoon = ({ title }) => (
  <div style={{ padding: "2rem" }}>
    <h2>{title}</h2>
    <p style={{ color: "var(--text)", marginTop: "0.5rem" }}>Esta sección está en desarrollo...</p>
  </div>
);

// ─── Router ─────────────────────────────────────────────────
export const router = createBrowserRouter([
  // ════════════════════════════════════════════════════════════
  //  RUTAS PÚBLICAS
  // ════════════════════════════════════════════════════════════
  {
    element: <PublicRoute  />,
    children: [
      {
        element: <LayoutUser />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage /> },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  //  RUTAS PRIVADAS - USUARIO AUTH
  // ════════════════════════════════════════════════════════════
  {
    element: <PrivateRoute allowedRoles={[1, 2]} />,
    children: [
      {
        element: <LayoutUser />,
        children: [
          { path: "/home", element: <LayoutUserPage /> },
          { path: "/perfil", element: <ComingSoon title="Mi Perfil" /> },
          { path: "/comunicaciones/mensajes", element: <ComingSoon title="Mensajes" /> },
          { path: "/comunicaciones/bandeja", element: <ComingSoon title="Bandeja" /> },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  //  RUTAS PRIVADAS - Solo SUPER_ADMIN
  // ════════════════════════════════════════════════════════════
  {
    element: <PrivateRoute allowedRoles={[1]} />,
    children: [
      {
        element: <LayoutUser />,
        children: [
          { path: "/admin/peliculas", element: <ComingSoon title="Gestión de Peliculas" /> },
          // {
          //   path: "/super-admin/role-opcion",
          //   element: <RoleOpcionPage />,
          // },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  //  RUTAS LIBRES (sin guard) — accesibles por todos
  // ════════════════════════════════════════════════════════════
  {
    element: <LayoutUser />,
    children: [
      { path: "/movie/:id", element: <LayoutMovie /> },
    ],
  },

  // ════════════════════════════════════════════════════════════
  //  CATCH ALL → 404
  // ════════════════════════════════════════════════════════════
  {
    path: "*",
    element: <ComingSoon title="Página no encontrada (404)" />,
  },
]);
