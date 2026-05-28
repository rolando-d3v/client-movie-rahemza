import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FaArrowLeft,
  FaEye,
  FaThumbsUp,
  FaHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaRegBookmark,
  FaRegListAlt,
  FaRegEdit,
} from "react-icons/fa";
import styles from "./movie.module.css";

import {fetchMovieDetails, fetchMovieCredits, imageEnpointOriginal, imageEnpoint500 } from "../../../../services/movie";


// ─── Stars Renderer ─────────────────────────────────────────
function RenderStars({ rating, size = "normal" }) {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < full; i++) {
    stars.push(
      <FaStar
        key={`full-${i}`}
        className={size === "small" ? styles.review_star : styles.star}
      />,
    );
  }
  if (hasHalf) {
    stars.push(
      <FaStarHalfAlt
        key="half"
        className={size === "small" ? styles.review_star : styles.star}
      />,
    );
  }
  const remaining = 5 - full - (hasHalf ? 1 : 0);
  for (let i = 0; i < remaining; i++) {
    stars.push(
      <FaRegStar
        key={`empty-${i}`}
        className={
          size === "small" ? styles.review_star_empty : styles.star_empty
        }
      />,
    );
  }
  return <>{stars}</>;
}

// ─── Component ──────────────────────────────────────────────
function LayoutMovie() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("casts");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [movieRaw, setMovieRaw] = useState(null);
  const [creditsRaw, setCreditsRaw] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getMovieInfo = async () => {
        setLoading(true);
        try {
          const [movieRes, creditsRes] = await Promise.all([
            fetchMovieDetails(id),
            fetchMovieCredits(id)
          ]);
          setMovieRaw(movieRes);
          setCreditsRaw(creditsRes);
        } catch (error) {
          console.error("Error fetching movie data:", error);
        } finally {
          setLoading(false);
        }
      };
      getMovieInfo();
    }
  }, [id]);

  if (loading || !movieRaw) {
    return <div style={{ color: "white", padding: "100px", textAlign: "center", fontSize: "1.2rem" }}>Cargando película...</div>;
  }

  const directorObj = creditsRaw?.crew?.find(c => c.job === "Director");
  const director = directorObj ? directorObj.name : "Desconocido";

  const movieData = {
    title: movieRaw.title || movieRaw.name,
    year: movieRaw.release_date ? movieRaw.release_date.split('-')[0] : "",
    duration: movieRaw.runtime ? `${movieRaw.runtime} mins` : "",
    director: director,
    tagline: movieRaw.tagline || "",
    synopsis: movieRaw.overview || "Sin sinopsis disponible.",
    backdrop: imageEnpointOriginal(movieRaw.backdrop_path) || "/images/movies/titanic_backdrop.png",
    poster: imageEnpoint500(movieRaw.poster_path) || "/images/movies/titanic_poster.png",
    genres: movieRaw.genres ? movieRaw.genres.map(g => g.name) : [],
    rating: (movieRaw.vote_average || 0) / 2,
    views: movieRaw.popularity ? Math.round(movieRaw.popularity) : 0,
    likes: movieRaw.vote_count || 0,
    hearts: "N/A",
    ratingDistribution: [8, 12, 22, 55, 70, 45, 30, 18], // mock
    cast: creditsRaw?.cast?.slice(0, 12).map((c, i) => ({
      name: c.name,
      role: c.character,
      initials: c.name.substring(0, 2).toUpperCase(),
      profile_path: c.profile_path ? imageEnpoint500(c.profile_path) : null,
      id: c.id || i
    })) || [],
    crew: creditsRaw?.crew?.slice(0, 12).map((c, i) => ({
      name: c.name,
      role: c.job,
      initials: c.name.substring(0, 2).toUpperCase(),
      profile_path: c.profile_path ? imageEnpoint500(c.profile_path) : null,
      id: c.id || i
    })) || [],
    details: {
      "Estreno": movieRaw.release_date,
      "Presupuesto": movieRaw.budget ? `$${(movieRaw.budget / 1000000).toFixed(1)}M` : "N/A",
      "Recaudación": movieRaw.revenue ? `$${(movieRaw.revenue / 1000000).toFixed(1)}M` : "N/A",
      "Estado": movieRaw.status,
      "Idioma Original": movieRaw.original_language?.toUpperCase()
    },
    reviews: [] 
  };

  const maxBar = Math.max(...movieData.ratingDistribution);



  return (
    <div className={styles.layout_movie}>
      {/* ═══ Hero Backdrop ═══ */}
      <section className={styles.hero}>
        <img
          src={movieData.backdrop}
          alt={`${movieData.title} backdrop`}
          className={styles.hero_backdrop}
        />
        <div className={styles.hero_gradient} />
        <button
          className={styles.hero_back_btn}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>

      </section>

      {/* ═══ Movie Info ═══ */}
      <section className={styles.movie_info_section}>
        <div className={styles.poster_wrapper}>
          <img
            src={movieData.poster}
            alt={`${movieData.title} poster`}
            className={styles.poster_img}
          />
        </div>

        <div className={styles.info_content}>
          <div className={styles.title_row}>
            <h1 className={styles.movie_title}>{movieData.title}</h1>
            <span className={styles.movie_year}>{movieData.year}</span>
            <span className={styles.movie_duration}>{movieData.duration}</span>
          </div>

          <p className={styles.movie_director}>
            Directed by <strong>{movieData.director}</strong>
          </p>

          <p className={styles.movie_tagline}>{movieData.tagline}</p>

          <p className={styles.movie_synopsis}>{movieData.synopsis}</p>

          <ul className={styles.genre_list}>
            {movieData.genres.map((genre) => (
              <li key={genre} className={styles.genre_tag}>
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ Stats & Actions ═══ */}
      <section className={styles.stats_actions_bar}>
        <div className={styles.stats_group}>
          <div className={styles.stat_item}>
            <FaEye
              className={`${styles.stat_icon} ${styles.stat_icon_views}`}
            />
            <span>{movieData.views}</span>
          </div>
          <div className={styles.stat_item}>
            <FaThumbsUp
              className={`${styles.stat_icon} ${styles.stat_icon_likes}`}
            />
            <span>{movieData.likes}</span>
          </div>
          <div className={styles.stat_item}>
            <FaHeart
              className={`${styles.stat_icon} ${styles.stat_icon_hearts}`}
            />
            <span>{movieData.hearts}</span>
          </div>
        </div>

        <div className={styles.actions_group}>
          <button className={styles.action_btn_primary}>
            <FaRegEdit className={styles.action_icon} />
            Rate or Review
          </button>
          <button className={styles.action_btn}>
            <FaRegListAlt className={styles.action_icon} />
            Add to Lists
          </button>
          <button className={styles.action_btn}>
            <FaRegBookmark className={styles.action_icon} />
            Add to Watchlist
          </button>
        </div>
      </section>

      {/* ═══ Ratings ═══ */}
      <section className={styles.rating_section}>
        <h2 className={styles.rating_title}>Ratings</h2>

        <div className={styles.rating_chart}>
          {movieData.ratingDistribution.map((val, i) => (
            <div
              key={i}
              className={styles.rating_bar}
              style={{ height: `${(val / maxBar) * 70}px` }}
            />
          ))}
        </div>

        <div className={styles.rating_score_group}>
          <span className={styles.rating_score}>
            {movieData.rating.toFixed(1)}
          </span>
          <div className={styles.rating_stars}>
            <RenderStars rating={movieData.rating} />
          </div>
        </div>
      </section>

      {/* ═══ Tabs ═══ */}
      <section className={styles.tabs_section}>
        <div className={styles.tabs_header}>
          {["casts", "crews", "details"].map((tab) => (
            <button
              key={tab}
              className={
                activeTab === tab ? styles.tab_btn_active : styles.tab_btn
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.tab_content}>
          {/* ─── Casts Tab ─── */}
          {activeTab === "casts" && (
            <div className={styles.cast_grid}>
              {movieData.cast.map((actor) => (
                <div key={actor.id} className={styles.cast_card}>
                  {actor.profile_path ? (
                    <img src={actor.profile_path} alt={actor.name} className={styles.cast_avatar} />
                  ) : (
                    <div className={styles.cast_avatar_placeholder}>
                      {actor.initials}
                    </div>
                  )}
                  <span className={styles.cast_name}>{actor.name}</span>
                  <span className={styles.cast_role}>{actor.role}</span>
                </div>
              ))}
            </div>
          )}

          {/* ─── Crews Tab ─── */}
          {activeTab === "crews" && (
            <div className={styles.crew_grid}>
              {movieData.crew.map((member) => (
                <div key={`${member.id}-${member.role}`} className={styles.crew_card}>
                  {member.profile_path ? (
                    <img src={member.profile_path} alt={member.name} className={styles.crew_avatar} style={{ objectFit: 'cover' }} />
                  ) : (
                    <div className={styles.crew_avatar}>{member.initials}</div>
                  )}
                  <div>
                    <p className={styles.crew_name}>{member.name}</p>
                    <p className={styles.crew_role}>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── Details Tab ─── */}
          {activeTab === "details" && (
            <div className={styles.details_grid}>
              {Object.entries(movieData.details).map(([label, value]) => (
                <div key={label} className={styles.detail_item}>
                  <span className={styles.detail_label}>{label}</span>
                  <span className={styles.detail_value}>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ Reviews ═══ */}
      <section className={styles.reviews_section}>
        <div className={styles.reviews_header}>
          <h2 className={styles.reviews_title}>All Reviews</h2>
          <button className={styles.reviews_see_all}>See All</button>
        </div>

        <div className={styles.reviews_grid}>
          {movieData.reviews.map((review) => (
            <div key={review.author} className={styles.review_card}>
              <div className={styles.review_header}>
                <div className={styles.review_avatar}>{review.initials}</div>
                <div className={styles.review_author_info}>
                  <p className={styles.review_author_name}>
                    Review by {review.author}
                  </p>
                  <div className={styles.review_meta}>
                    <div className={styles.review_stars}>
                      <RenderStars rating={review.rating} size="small" />
                    </div>
                    <span className={styles.review_comments_count}>
                      🗨 {review.comments}
                    </span>
                  </div>
                </div>
              </div>
              <p className={styles.review_text}>
                {review.text.length > 200
                  ? review.text.slice(0, 200) + "..."
                  : review.text}
              </p>
              {review.text.length > 200 && (
                <button className={styles.review_read_more}>Read more ›</button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LayoutMovie;
