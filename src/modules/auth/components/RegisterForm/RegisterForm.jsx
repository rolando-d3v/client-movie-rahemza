import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegister } from "../../hooks/useRegister";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiPhone,
} from "react-icons/fi";
import { useState } from "react";
import styles from "./RegisterForm.module.css";

const registerSchema = z
  .object({
    nombre: z
      .string()
      .min(1, "El nombre es requerido")
      .min(2, "El nombre debe tener al menos 2 caracteres"),
    apellido: z
      .string()
      .min(1, "El apellido es requerido")
      .min(2, "El apellido debe tener al menos 2 caracteres"),
    email: z
      .string()
      .min(1, "El correo es requerido")
      .email("Ingresa un correo válido"),
    telefono: z.string().optional(),
    password: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const { handleRegister, isLoading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;
    handleRegister(userData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* ── Nombre y Apellido (2 columnas) ────────────── */}
      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="reg-nombre">
            Nombre
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.nombre ? styles.inputWrapperError : ""
            }`}
          >
            <FiUser className={styles.icon} />
            <input
              id="reg-nombre"
              type="text"
              className={styles.input}
              placeholder="Juan"
              autoComplete="given-name"
              {...register("nombre")}
            />
          </div>
          {errors.nombre && (
            <span className={styles.error}>{errors.nombre.message}</span>
          )}
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="reg-apellido">
            Apellido
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.apellido ? styles.inputWrapperError : ""
            }`}
          >
            <FiUser className={styles.icon} />
            <input
              id="reg-apellido"
              type="text"
              className={styles.input}
              placeholder="Pérez"
              autoComplete="family-name"
              {...register("apellido")}
            />
          </div>
          {errors.apellido && (
            <span className={styles.error}>{errors.apellido.message}</span>
          )}
        </div>
      </div>

      {/* ── Email ─────────────────────────────────────── */}
      <div className={styles.group}>
        <label className={styles.label} htmlFor="reg-email">
          Correo electrónico
        </label>
        <div
          className={`${styles.inputWrapper} ${
            errors.email ? styles.inputWrapperError : ""
          }`}
        >
          <FiMail className={styles.icon} />
          <input
            id="reg-email"
            type="email"
            className={styles.input}
            placeholder="correo@colegio.edu.pe"
            autoComplete="email"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      {/* ── Teléfono ──────────────────────────────────── */}
      <div className={styles.group}>
        <label className={styles.label} htmlFor="reg-telefono">
          Teléfono <span className={styles.optional}>(opcional)</span>
        </label>
        <div className={styles.inputWrapper}>
          <FiPhone className={styles.icon} />
          <input
            id="reg-telefono"
            type="tel"
            className={styles.input}
            placeholder="+51 999 999 999"
            autoComplete="tel"
            {...register("telefono")}
          />
        </div>
      </div>

      {/* ── Password (2 columnas) ─────────────────────── */}
      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="reg-password">
            Contraseña
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.password ? styles.inputWrapperError : ""
            }`}
          >
            <FiLock className={styles.icon} />
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              className={styles.input}
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("password")}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="reg-confirm">
            Confirmar contraseña
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.confirmPassword ? styles.inputWrapperError : ""
            }`}
          >
            <FiLock className={styles.icon} />
            <input
              id="reg-confirm"
              type={showConfirm ? "text" : "password"}
              className={styles.input}
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowConfirm(!showConfirm)}
              tabIndex={-1}
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      {/* ── Submit ─────────────────────────────────────── */}
      <button
        type="submit"
        className={styles.submit}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className={styles.spinner} />
        ) : (
          "Crear cuenta"
        )}
      </button>

      {/* ── Link a Login ──────────────────────────────── */}
      <div className={styles.footerLink}>
        <span>¿Ya tienes cuenta?</span>
        <a href="/login" className={styles.link}>
          Inicia sesión
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
