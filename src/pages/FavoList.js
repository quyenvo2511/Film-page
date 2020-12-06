import React, { useEffect, useState } from "react";
import NaviBar from "../components/NaviBar";
import { getMovieDetailData } from "../DataFetcher";
import { Card } from "react-bootstrap";

const FavoList = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";
  const getFavMovies = async () => {
    const movieIds = Object.keys(sessionStorage);
    const movies = await Promise.all(
      movieIds.map(async (id) => {
        const movie = await getMovieDetailData(id);
        console.log(movie);
        return movie;
      })
    );

    return movies;
  };

  const loadingFav = async () => {
    setIsLoading(true);
    let favMovies = await getFavMovies();
    setMovieList(favMovies);
    setIsLoading(false);
  };
  useEffect(() => {
    loadingFav();
  }, []);
  // useEffect(() => {
  //   if (isLoading) {
  //     getFavMovies();
  //     // setMovieList(favMovies);
  //   }
  // }, []);

  return (
    <div>
      <div className="nav-bar-1">
        <NaviBar />
      </div>

      <div className="control-fav">
        {isLoading && movieList ? (
          <p>Loading</p>
        ) : (
          <div>
            {movieList.map((movie) => (
              <div key={movie.id}>
                <Card.Img
                  variant="top"
                  src={`${POSTER_BASE_URL}${movie.poster_path}`}
                />
                <h3>{movie.original_title}</h3>
                <p>{movie.overview}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { FavoList };
