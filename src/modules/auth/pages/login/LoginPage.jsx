import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "../../../../config/auth-client";
import styles from "./registro.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schema_auth";
import { useNavigate } from "react-router";
import { useState, useTransition } from "react";
import images from '../../../../assets/login/login.jpg'
import { URL_CLIENT } from "../../../../config/constants";



export default function LoginPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();


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

  const onSubmit = async (values) => {
    console.log(values);
    setError("");
    setSuccess("");

    startTransition(async () => {
      // Aquí puedes agregar tu lógica de login con axios o fetch
      // Ejemplo:
      // try {
      //   const res = await axios.post(`${API_RAHEMSA}/auth/login`, values);
      //   setSuccess("Logged in successfully");
      //   navigate("/");
      // } catch (err) {
      //   setError("Error en las credenciales");
      // }
      console.log("Login submitted:", values);
      setSuccess("Login form submitted");
    });
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
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: `${URL_CLIENT}/dashboard`,
                });
              }}
            >
              <FcGoogle className={styles.googleLogo} />
              Google
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
                  />
                </div>
                <p>{errors.password?.message}</p>
              </div>

              <div>
                {error && <p style={{ background: '#fecaca', color: '#dc2626', padding: '8px', borderRadius: '4px' }}>{error}</p>}
                {success && (
                  <p style={{ background: '#bbf7d0', color: '#16a34a', padding: '8px', borderRadius: '4px' }}>{success}</p>
                )}
              </div>

              <button
                disabled={isPending}
                className={styles.loginButton}
                type="submit"
              >
                Iniciar sesion
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
