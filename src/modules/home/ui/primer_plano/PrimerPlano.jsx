import styles from "./primer.module.css";

const PrimerPlano = () => {
  return (
    <div className={styles.content_primer_plano}>
      <div className={styles.div_content}>
        
        <div className={styles.heroContent}>
          <p className={styles.subtitle}>#1 Escuela Principal</p>
          <h1 className={styles.title}>
            Aprende <br /> Para en Futuro
          </h1>

          {/* Botones */}
          <div className={styles.buttons}>
            <button className={styles.primaryButton}>Get in touch →</button>
            <button className={styles.secondaryButton}>Our services</button>
          </div>
        </div>

        {/* Proyecto destacado */}
        <div className={styles.projectCard}>
          <div className={styles.projectImage}>
            <img
              className={styles.image_principal}
              src="/images/home/print.png"
              alt="Recent"
              width={700}
              height={700}
            />
          </div>
        </div>

        {/* Sección de estadísticas */}
        <div className={styles.estadistica}>
          <div className={styles.div_estadistica}>
            <h2 className={styles.title}>6 mil</h2>
            <p className={styles.descripcion}>
              Alumnos con Trabajo en Empresas Top
            </p>
          </div>
          <div className={styles.div_estadistica}>
            <h2 className={styles.title}>315</h2>
            <p className={styles.descripcion}>Ventas completadas </p>
          </div>
          <div className={styles.div_estadistica}>
            <h2 className={styles.title}>120K</h2>
            <p className={styles.descripcion}>
              Los empleados trabajan en todas partes del mundo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimerPlano;
