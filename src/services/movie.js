import axios from "axios";




// 🔑 pon tu API Key
const API_KEY = "17502f7d08d06ce8147a188351508546";
const BASE_URL = "https://api.themoviedb.org/3";

// const trendingMoviesEnpoint = `${BASE_URL}/trending/movie/day?api_key=`;
const trendingMoviesEnpoint = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

const searchMoviesEnpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}`;







export const imageEnpointOriginal = (path) => path ? `https://image.tmdb.org/t/p/original${path}` : null;
export const imageEnpoint500 = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const imageEnpoint342 = (path) => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const imageEnpoint185 = (path) => path ? `https://image.tmdb.org/t/p/w185${path}` : null;


const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
    // headers: {
    //   accept: "application/json",
    //   Authorization: `Bearer ${API_KEY}`,
    // },
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
  return apiCall(trendingMoviesEnpoint);
};

export const fetchSearchMovies = params => {
  return apiCall(searchMoviesEnpoint, params);
};

export const fetchMovieDetails = (id) => {
  return apiCall(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`);
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
