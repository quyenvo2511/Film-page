import React, { useEffect, useState } from "react";

import { getMovieDetailData } from "../DataFetcher";


const FavoList = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFavMovies = async () => {
    const movieIds = Object.keys(sessionStorage);
    const movies = await Promise.all(movieIds.map(async (id) => {
      const movie = await getMovieDetailData(id);
      console.log(movie);
      return movie;
    }))

    return movies;
  }

  useEffect(async () => {
    setIsLoading(true);
    let favMovies = await getFavMovies();
    setMovieList(favMovies);
    setIsLoading(false);
  },[])

  return (
    <div>
      <h1>this is my fav list</h1>
      {isLoading && movieList ? <p>Loading</p> : 
        movieList.map(movie => 
        <div key={movie.id}>
          <h3>{movie.original_title}</h3>
          <p>{movie.overview}</p>
        </div>)
      }
    </div>
  );
};

export  { FavoList};
