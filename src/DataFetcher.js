import api from "./apiService";
const getMovieDetailData = async (movieId) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_API}movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`;

  // const response = await fetch(API_URL);
  // const data = await response.json();

  const data = await api.get(API_URL);
  console.log(data);
  return data;
};

export { getMovieDetailData };
