import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { verifySessionService } from "../../services/authService";
import { setCredentials, logout } from "../../../../redux/slices/authSlice";
import styles from "./AuthInitializer.module.css";

/**
 * Componente que verifica la sesión (cookie HttpOnly) al iniciar la app.
 * Debe envolver al RouterProvider para que se ejecute antes del routing.
 */
export const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["auth", "verify"],
    queryFn: verifySessionService,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });


  console.log(data);



  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials(data));
    }
    if (isError) {
      dispatch(logout());
    }
  }, [isSuccess, isError, data, dispatch]);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner} />
        <p className={styles.text}>Cargando Colex...</p>
      </div>
    );
  }

  return children;
};
