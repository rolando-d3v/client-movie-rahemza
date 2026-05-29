import axios from "axios";




// 🔑 pon tu API Key
const API_KEY = import.meta.env.VITE_API_KEY || "xxxxxxxxxxxxxxxxxxxxxxxxxxx";
const BASE_URL = "https://api.themoviedb.org/3";

// const trendingMoviesEnpoint = `${BASE_URL}/trending/movie/day?api_key=`;
const trendingMoviesEnpoint = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;


const popularEndpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-MX`;

const searchMoviesEnpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}`;

const searchSeriesEnpoint = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=juego+de+tronos&language=es-ES`;
// https://api.themoviedb.org/3/search/tv?api_key=TU_API_KEY&query=juego+de+tronos&language=es-ES





export const imageEnpointOriginal = (path) => path ? `https://image.tmdb.org/t/p/original${path}` : null;
export const imageEnpoint500 = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const imageEnpoint342 = (path) => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const imageEnpoint185 = (path) => path ? `https://image.tmdb.org/t/p/w185${path}` : null;


const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error al obtener películas:", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(popularEndpoint);
};

export const fetchSearchMovies = params => {
  return apiCall(searchMoviesEnpoint, params);
};

export const fetchMovieDetails = (id) => {
  return apiCall(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`);
};

export const fetchMovieVideos = (id) => {
  return apiCall(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`);
};

export const fetchMovieCredits = (id) => {
  return apiCall(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=es-MX`);
};












// export const getMovies = async () => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
//     );
//     return response.data.results;
//   } catch (error) {
//     console.error("Error al obtener películas:", error);
//     return [];
//   }
// };
