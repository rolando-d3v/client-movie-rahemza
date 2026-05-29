import { useEffect, useState } from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { fetchMovieVideos } from "../../services/movie";
import styles from "./modal_trailer.module.css";

function ModalTrailer({ movieId, isOpen, onClose }) {
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cargar el video de TMDB cuando se abra el modal o cambie el movieId
  useEffect(() => {
    if (!isOpen || !movieId) return;

    const getTrailer = async () => {
      setLoading(true);
      setVideoKey(null);
      try {
        const data = await fetchMovieVideos(movieId);
        if (data && data.results && data.results.length > 0) {
          // Prioridad: 1. Trailer en YouTube, 2. Teaser en YouTube, 3. Cualquier video de YouTube
          const trailer = 
            data.results.find(v => v.site === "YouTube" && v.type === "Trailer") ||
            data.results.find(v => v.site === "YouTube" && v.type === "Teaser") ||
            data.results.find(v => v.site === "YouTube");

          if (trailer) {
            setVideoKey(trailer.key);
          }
        }
      } catch (error) {
        console.error("Error al obtener videos de la película:", error);
      } finally {
        setLoading(false);
      }
    };

    getTrailer();
  }, [movieId, isOpen]);

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  // Cerrar al hacer clic en el fondo gris translúcido
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.content_modal_trailer} onClick={handleOverlayClick}>
      <div className={styles.div_modal_trailer}>
        {/* Botón de cerrar */}
        <button 
          className={styles.close_button} 
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <FaTimes />
        </button>

        {/* Contenido principal del Modal */}
        {loading ? (
          <div className={styles.loading_container}>
            <div className={styles.spinner}></div>
            <span className={styles.loading_text}>Cargando tráiler...</span>
          </div>
        ) : videoKey ? (
          <div className={styles.video_wrapper}>
            <iframe
              className={styles.video_iframe}
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
              title="Tráiler de la película"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className={styles.error_container}>
            <FaExclamationTriangle className={styles.error_icon} />
            <h2 className={styles.error_title}>Tráiler no disponible</h2>
            <p className={styles.error_desc}>
              Lo sentimos, no se encontró un tráiler oficial disponible en YouTube para esta película.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalTrailer;