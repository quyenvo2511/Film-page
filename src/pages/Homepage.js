import NaviBar from "../components/NaviBar";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "../components/SearchForm";
import MenuSide from "../components/MenuSide";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";

import {
  sortMoviesByAtoZ,
  sortMoviesByZtoA,
  sortMoviesByPopularity,
} from "../Sorting";

const HomePage = () => {
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";
  const API_KEY = "8bb27996f17866f8d8aa2ee7f2bb50aa";
  const [movieList, setMovieList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  /// capture searchConfirm
  const [searchTerm, setSearchTerm] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [yearRange, setYearRange] = useState({ min: 1990, max: 2020 });
  const [ratingRange, setRatingRange] = useState({ min: 0, max: 10 });
  const totalPage = 50;
  ///

  const history = useHistory();

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    console.log(searchTerm);
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${pageNum}`;
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log(data);
      setMovieList(data.results);
      setIsLoading(false);
    } catch (error) {
      window.alert("Not found");
    }
  };
  const performSearch = async (e) => {
    e.preventDefault();
    setConfirm(searchTerm);
  };

  const getSearch = async () => {
    try {
      setIsLoading(true);
      console.log("got in ", searchTerm);
      const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${searchTerm}`;
      const res = await fetch(API_URL);
      const data = await res.json();

      console.log("hahaha", data);
      setMovieList(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log("Not found");
    }
  };

  const sortAscending = () => {
    const newList = sortMoviesByAtoZ(movieList);
    setMovieList(newList);
  };

  const sortDescending = () => {
    setMovieList(sortMoviesByZtoA(movieList));
  };

  const sortByPopularity = () => {
    setMovieList(sortMoviesByPopularity(movieList));
  };

  useEffect(() => {
    getData();
  }, [pageNum]);

  useEffect(() => {
    getData();
    if (confirm) {
      getSearch();
    } else {
      getData();
    }
  }, [confirm]);

  const handleCardClick = (movieId) => {
    history.push(`/movies/${movieId}`);
  };

  return (
    <div className="container-1">
      <section className="search-section">
        <NaviBar />
        <SearchForm
          performSearch={performSearch}
          updateSearchTerm={updateSearchTerm}
        />
      </section>

      <div className="row">
        <div className="left-side col-2">
          <MenuSide
            sortAsc={sortAscending}
            sortDesc={sortDescending}
            sortPopular={sortByPopularity}
            yearRange={yearRange}
            setYearRange={setYearRange}
            ratingRange={ratingRange}
            setRatingRange={setRatingRange}
          />
        </div>
        <div className="right-side col-10 d-flex">
          {isLoading ? (
            <p>Loading</p>
          ) : (
            movieList
              ?.filter((item) => {
                const releaseDate = new Date(item.release_date);
                const year = releaseDate.getFullYear();
                const rating = item.vote_average;

                return (
                  year <= yearRange.max &&
                  year >= yearRange.min &&
                  rating >= ratingRange.min &&
                  rating <= ratingRange.max
                );
              })
              .map((item) => (
                <Card
                  className="every-card"
                  onClick={() => handleCardClick(item.id)}
                >
                  <Card.Img
                    variant="top"
                    src={`${POSTER_BASE_URL}${item.poster_path}`}
                  />
                </Card>
              ))
          )}
        </div>
        <div className="pagination">
          <PaginationBar
            pageNum={pageNum}
            totalPageNum={totalPage}
            setPageNum={setPageNum}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
