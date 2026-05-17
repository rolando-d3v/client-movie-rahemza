import { createBrowserRouter } from "react-router";
import PublicRoute from "./guards/PublicRoute";
import PrivateRoute from "./guards/PrivateRoute";




// Layouts
import HomeLayout from "../modules/home/HomeLayout";
import HomePage from "../modules/home/HomePage";
import DashboardLayout from "../modules/dashboard/layout/layout_dashboard/DashboardLayout";
// import CursoLayout from "./pages/dashboard/curso/CursoLayout";

// Pages
// import HomePage from "../pages/dashboard/DashboardLayout";
import LoginPage from "../modules/auth/pages/LoginPage/LoginPage";
import MisCursosPage from "../modules/dashboard/pages/mis-cursos/DashboardMisCursosPage";
// import CursoPage from "../modules/dashboard/pages/curso/CursoPage";
import CursoPage from "../modules/dashboard/pages/curso/CursoLayout";
import TemaPage from "../modules/dashboard/pages/tema/TemaPage";
import ResultadosPage from "../modules/dashboard/pages/resultados/ResultadosPage";
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
  //  RUTAS PÚBLICAS (login, recover, register)
  // ════════════════════════════════════════════════════════════
  {
    element: <PublicRoute />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/", element: <HomePage /> },
          // { path: "/register", element: <RegisterUserPage /> },
          // { path: "/recover", element: <RecoverPage /> },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  //  PÁGINA NO AUTORIZADO
  // ════════════════════════════════════════════════════════════
  // { path: "/no-autorizado", element: <UnauthorizedPage /> },

  // ════════════════════════════════════════════════════════════
  //  RUTAS PRIVADAS - Todos los roles autenticados
  // ════════════════════════════════════════════════════════════
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
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
    element: <PrivateRoute allowedRoles={[2]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/super-admin/colegios",
            element: <ComingSoon title="Gestión de Colegios" />,
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
  //  RUTAS PRIVADAS  ADMIN_COLEGIO
  // ════════════════════════════════════════════════════════════
  {
    element: <PrivateRoute allowedRoles={[2]} />,
    children: [
      {
     element: <DashboardLayout />,
        children: [
          {
            path: "/candidato/dashboard",
            element: <ComingSoon title="Dashboard" />,
          },
          {
            path: "/candidato/mis-cursos",
            element: <MisCursosPage />,
          },
          {
            path: "/candidato/curso/:id_curso",
            element: <CursoPage />,
          },
          {
            path: "/candidato/curso/:id_curso/tema/:id_tema",
            element: <TemaPage  />,
          },
          {
            path: "/candidato/curso/:id_curso/resultados",
            element: <ResultadosPage/>,
          },
          // {
          //   path: "/admin-colegio/horario",
          //   element: <ComingSoon title="Horarios" />,
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
