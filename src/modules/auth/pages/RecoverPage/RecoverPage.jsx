import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { recoverPasswordService } from "../../services/authService";
import { toast } from "sonner";
import { Link } from "react-router";
import styles from "./RecoverPage.module.css";

const recoverSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es requerido")
    .email("Ingresa un correo válido"),
});

const RecoverPage = () => {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recoverSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await recoverPasswordService(data.email);
      setSent(true);
      toast.success("Se envió un enlace de recuperación a tu correo");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al enviar el correo"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🔑</span>
          </div>
          <h1 className={styles.title}>Recuperar contraseña</h1>
          <p className={styles.subtitle}>
            {sent
              ? "Revisa tu bandeja de entrada"
              : "Ingresa tu correo para recibir un enlace de recuperación"}
          </p>
        </div>

        {!sent ? (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="email">
                Correo electrónico
              </label>
              <div
                className={`${styles.inputWrapper} ${
                  errors.email ? styles.inputWrapperError : ""
                }`}
              >
                <FiMail className={styles.icon} />
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="correo@colegio.edu.pe"
                  autoComplete="email"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <span className={styles.error}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner} />
              ) : (
                "Enviar enlace"
              )}
            </button>
          </form>
        ) : (
          <div className={styles.sentMessage}>
            <p>
              📧 Hemos enviado un enlace de recuperación a tu correo electrónico.
            </p>
          </div>
        )}

        <div className={styles.footer}>
          <Link to="/login" className={styles.backLink}>
            <FiArrowLeft /> Volver al login
          </Link>
        </div>
      </div>

      <div className={styles.bg}>
        <div className={`${styles.bgCircle} ${styles.bgCircle1}`} />
        <div className={`${styles.bgCircle} ${styles.bgCircle2}`} />
        <div className={`${styles.bgCircle} ${styles.bgCircle3}`} />
      </div>
    </div>
  );
};

export default RecoverPage;
