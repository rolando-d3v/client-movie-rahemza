import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import * as Faicons from "react-icons/fa";
import { fetchSearchMovies } from "../../../../modules/movie/services/movie";
import styles from "./components.module.css";

export default function NavSearch({ isMobile = false, onSelectMovie }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar al hacer clic fuera del buscador
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: value.trim(),
        include_adult: "false",
        language: "es-mx",
        page: "1",
      })
        .then((data) => {
          setLoading(false);
          if (data && data.results) {
            setResults(data.results);
            setIsOpen(true);
          }
        })
        .catch(() => {
          setLoading(false);
          setResults([]);
        });
    } else {
      setLoading(false);
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
    setQuery("");
    setResults([]);
    setIsOpen(false);
    if (onSelectMovie) onSelectMovie();
  };

  return (
    <div
      className={isMobile ? styles.searchContainerMobile : styles.searchContainer}
      ref={searchRef}
    >
      <Faicons.FaSearch className={styles.searchIcon} />
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        onFocus={() => results.length > 0 && setIsOpen(true)}
        placeholder="Buscar películas, series..."
        className={styles.searchInput}
      />
      {loading && <div className={styles.searchSpinner} />}

      {isOpen && results.length > 0 && (
        <ul className={styles.searchResults}>
          {results.slice(0, 6).map((movie) => (
            <li
              key={movie.id}
              className={styles.searchItem}
              onClick={() => handleMovieClick(movie.id)}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className={styles.searchItemPoster}
                />
              ) : (
                <div className={styles.searchItemPosterFallback}>
                  <Faicons.FaFilm />
                </div>
              )}
              <div className={styles.searchItemInfo}>
                <p className={styles.searchItemTitle}>{movie.title || movie.name}</p>
                <span className={styles.searchItemYear}>
                  {(movie.release_date || movie.first_air_date || "").slice(0, 4)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
