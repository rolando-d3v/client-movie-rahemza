import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaPlay, FaInfoCircle, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { fetchTrendingMovies, imageEnpointOriginal } from "../../../../services/movie";
import ModalTrailer from "../../../../components/modal_trailer/ModalTrailer";
import styles from "./primer.module.css";

const FALLBACK_MOVIE = {
  id: 82346, // Dune: Part Two
  title: "Duna: Parte Dos",
  backdrop_path: "/xOm9jUzty0y6mN6jQh8smeJUthl.jpg",
  overview: "Sigue el viaje mítico de Paul Atreides mientras se une a Chani y a los Fremen en una senda de venganza contra los conspiradores que destruyeron a su familia. Ante la elección entre el amor de su vida y el destino del universo conocido, se esfuerza por evitar un futuro terrible que solo él puede prever.",
  vote_average: 8.4,
  release_date: "2024-02-27",
};

const PrimerPlano = () => {
  const [movie, setMovie] = useState(FALLBACK_MOVIE);
  const [isMuted, setIsMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getFeaturedMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        if (data && data.results && data.results.length > 0) {
          console.log(data.results[10]);
          
          // Usamos la película más popular del día
          setMovie(data.results[10]);
        }
      } catch (error) {
        console.error("Error al obtener película destacada:", error);
      } finally {
        setLoading(false);
      }
    };

    getFeaturedMovie();
  }, []);

  const handlePlayClick = () => {
    setIsTrailerOpen(true);
  };

  const handleInfoClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const backdropUrl = imageEnpointOriginal(movie.backdrop_path) || "https://image.tmdb.org/t/p/original/gaKFXcB5J1gz0QqYj8bWIfrPc04.jpg";
  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "2024";
  const votePercentage = movie.vote_average ? Math.round(movie.vote_average * 10) : 85;

  return (
    <div className={styles.content_primer_plano}>
      {/* Fondo de película */}
      <div className={styles.backdrop_container}>
        <img
          className={styles.backdrop_image}
          src={backdropUrl}
          alt={movie.title || movie.name}
        />
        <div className={styles.gradient_overlay} />
      </div>

      <div className={styles.div_content}>
        <div className={styles.heroContent}>
          {/* Badge de Netflix Original / Destacado */}
          <span className={styles.badge}>
            ★ RECOMENDADO HOY
          </span>

          <h1 className={styles.title}>
            {movie.title || movie.name}
          </h1>

          {/* Fila de metadatos */}
          <div className={styles.metadata}>
            <span className={styles.match}>{votePercentage}% de coincidencia</span>
            <span className={styles.year}>{releaseYear}</span>
            <span className={styles.rating_tag}>16+</span>
            <span className={styles.duration}>2h 46m</span>
            <span className={styles.hd_tag}>HD</span>
          </div>

          <p className={styles.descripcion}>
            {movie.overview || "Explora el catálogo premium de películas y series más populares. Vive una experiencia de alta definición en Rahemza."}
          </p>

          {/* Botones de acción */}
          <div className={styles.buttons}>
            <button className={styles.primaryButton} onClick={handlePlayClick}>
              <FaPlay /> Reproducir
            </button>
            <button className={styles.secondaryButton} onClick={handleInfoClick}>
              <FaInfoCircle /> Más información
            </button>
          </div>
        </div>

        {/* Controles del lado derecho (Muted y Clasificación) */}
        <div className={styles.right_controls}>
          <button className={styles.mute_button} onClick={toggleMute} aria-label={isMuted ? "Activar sonido" : "Desactivar sonido"}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <span className={styles.maturity_rating}>16+</span>
        </div>

        {/* Sección de estadísticas de catálogo */}
        <div className={styles.estadistica}>
          <div className={styles.div_estadistica}>
            <p className={styles.stat_value}>6K+</p>
            <p className={styles.stat_desc}>Títulos Disponibles</p>
          </div>
          <div className={styles.div_estadistica}>
            <p className={styles.stat_value}>4K UHD</p>
            <p className={styles.stat_desc}>Streaming Premium</p>
          </div>
          <div className={styles.div_estadistica}>
            <p className={styles.stat_value}>120K+</p>
            <p className={styles.stat_desc}>Usuarios Activos</p>
          </div>
        </div>
      </div>

      {/* Modal para ver el trailer */}
      <ModalTrailer
        movieId={movie.id}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
};

export default PrimerPlano;
