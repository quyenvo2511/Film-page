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

  return (
    <div>
      <div className="nav-bar-1">
        <NaviBar />
      </div>

      <div className="control-fav">
        {isLoading && movieList ? (
          <p>Loading</p>
        ) : (
          <div className="d-flex control-card-favo-list">
            {movieList.map((movie) => (
              <div key={movie.id} className="d-flex">
                <div className="wrap-card">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={`${POSTER_BASE_URL}${movie.poster_path}`}
                    />
                    <Card.Body>
                      <Card.Title>{movie.original_title}</Card.Title>
                      <Card.Text>{movie.overview}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { FavoList };
