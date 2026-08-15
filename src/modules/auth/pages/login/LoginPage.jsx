import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "../../../../config/auth-client";
import styles from "./registro.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schema_auth";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import images from '../../../../assets/login/login.jpg';
import { FRONTEND_URL } from "../../../../config/constants";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setError("");
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${FRONTEND_URL}/home`,
      });
    } catch (err) {
      console.error("Error Google Login:", err);
      toast.error("Error al conectar con Google");
      setIsGoogleLoading(false);
    }
  };

  const onSubmit = async (values) => {
    setError("");
    setIsEmailLoading(true);

    try {
      const response = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (response?.error) {
        const errorMsg = response.error.message || "Correo o contraseña incorrectos";
        setError(errorMsg);
        toast.error(errorMsg);
        setIsEmailLoading(false);
        return;
      }

      // Revalidar sesión en background
      await queryClient.invalidateQueries({ queryKey: ["auth", "verify"] });

      toast.success("¡Bienvenido!");
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Error en login:", err);
      const errorMsg = err?.message || "Ocurrió un error al iniciar sesión";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsEmailLoading(false);
    }
  };

  return (
    <section className={styles.layout_login}>
      <div className={styles.loginContainer}>
        <div
          className={styles.leftPanel}
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url("${images}")` }}
        >
          <div className={styles.logo}>
            <img
              src="/images/logos/logo_rahemsa.png"
              alt="logo"
              width={40}
              height={40}
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>Rahemza</span>
          </div>

          <div className={styles.testimonialContainer}>
            <blockquote className={styles.quote}>
              Exigete y aprende cada dia
            </blockquote>
            <div className={styles.author}>
              <p className={styles.authorName}>Rahemza</p>
              <p className={styles.authorTitle}>Escuela Digital</p>
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.formContainer}>
            <h1 className={styles.heading}>Inicia Sesion</h1>

            <p className={styles.subheading}>
              Puedes iniciar sesion con tu cuenta de google
            </p>

            <button
              className={styles.googleButton}
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isEmailLoading}
              type="button"
            >
              <FcGoogle className={styles.googleLogo} />
              {isGoogleLoading ? "Conectando..." : "Google"}
            </button>

            <div className={styles.divider}>
              <span className={styles.dividerText}>
                O usar otras credenciales
              </span>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form}
            >
              <div className={styles.formField}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <div className={styles.inputContainer}>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={styles.input}
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                <p>{errors.email?.message}</p>
              </div>

              <div className={styles.formField}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.inputContainer}>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className={styles.input}
                    placeholder="••••••••"
                  />
                </div>
                <p>{errors.password?.message}</p>
              </div>

              <div>
                {error && (
                  <p style={{ background: '#fecaca', color: '#dc2626', padding: '8px', borderRadius: '4px', fontSize: '0.875rem' }}>
                    {error}
                  </p>
                )}
              </div>

              <button
                disabled={isEmailLoading || isGoogleLoading}
                className={styles.loginButton}
                type="submit"
              >
                {isEmailLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </form>

            <div className={styles.signupContainer}>
              <span className={styles.signupText}>No tienes una cuenta? </span>
              <Link to="/login" className={styles.signupLink}>
                Registrate Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
