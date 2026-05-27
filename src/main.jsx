import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { Providers } from "./redux/providers";
import QueryProvider from "./config/QueryProvider.jsx";
import { AuthInitializer } from "./modules/auth/components/AuthInitializer/AuthInitializer";
import { Toaster } from "sonner";
// router  raiz
import { RouterProvider } from "react-router";
import { router } from "./config/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <QueryProvider>
        <AuthInitializer>
           <Toaster richColors position="top-right"/>
          <RouterProvider router={router} />
        </AuthInitializer>
      </QueryProvider>
    </Providers>
  </StrictMode>,
);
