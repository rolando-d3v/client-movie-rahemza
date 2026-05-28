import { createBrowserRouter } from "react-router";
import PublicRoute from "./guards/PublicRoute";
import PrivateRoute from "./guards/PrivateRoute";

// Layouts
import LayoutUser from "../layout/layout_user/user_layout/LayoutUser";



import HomeLayout from "../modules/home/HomeLayout";
import HomePage from "../modules/home/HomePage";
import DashboardLayout from "../modules/dashboard/layout/layout_dashboard/DashboardLayout";



import LoginPage from "../modules/auth/pages/login/LoginPage";
// import LoginPage from "../modules/auth/pages/LoginPage/LoginPage";





// import MisCursosPage from "../modules/dashboard/pages/mis-cursos/DashboardMisCursosPage";
// import CursoPage from "../modules/dashboard/pages/curso/CursoPage";
import CursoPage from "../modules/dashboard/pages/curso/CursoLayout";
import LayoutMovie from "../modules/home/pages/profile_movie/LayoutMovie";
// import TemaPage from "../modules/dashboard/pages/tema/TemaPage";
// import ResultadosPage from "../modules/dashboard/pages/resultados/ResultadosPage";
// import DashboardPage from "./pages/dashboard/DashboardPage";
// import DashboardMisCursosPage from "./pages/dashboard/mis-cursos/DashboardMisCursosPage";




// ─── Placeholder para páginas aún no implementadas ──────────
const ComingSoon = ({ title }) => (
  <div style={{ padding: "2rem" }}>
    <h2>{title}</h2>
    <p style={{ color: "var(--text)", marginTop: "0.5rem" }}>
      Esta sección está en desarrollo...
    </p>
   
  </div>
);



// ─── Router ─────────────────────────────────────────────────
export const router = createBrowserRouter([
  // ════════════════════════════════════════════════════════════
  //  RUTAS PÚBLICAS 
  // ════════════════════════════════════════════════════════════
  {
    element: <PublicRoute />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/movie/:id", element: <LayoutMovie /> },
          // { path: "/register", element: <RegisterUserPage /> },
          // { path: "/recover", element: <RecoverPage /> },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  //  RUTAS PRIVADAS - USUARIO AUTH
  // ════════════════════════════════════════════════════════════
  {
    element: <PrivateRoute allowedRoles={[2]}  />,
    children: [
      {
        element: <LayoutUser />,
        children: [
          { path: "/dashboard", element: <ComingSoon title="Dashboard" /> },
          { path: "/perfil", element: <ComingSoon title="Mi Perfil" /> },
          {
            path: "/comunicaciones/mensajes",
            element: <ComingSoon title="Mensajes" />,
          },
          {
            path: "/comunicaciones/bandeja",
            element: <ComingSoon title="Bandeja" />,
          },
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
        element: <DashboardLayout />,
        children: [
          {
            path: "/admin/peliculas",
            element: <ComingSoon title="Gestión de Peliculas" />,
          },
          // {
          //   path: "/super-admin/role-opcion",
          //   element: <RoleOpcionPage />,
          // },
        ],
      },
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
