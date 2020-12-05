import NaviBar from "../components/NaviBar";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "../components/SearchForm";
import MenuSide from "../components/MenuSide";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";
  const API_KEY = "8bb27996f17866f8d8aa2ee7f2bb50aa";
  const [movieList, setMovieList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  /// capture searchConfirm
  const [searchTerm, setSearchTerm] = useState("");
  const [confirm, setConfirm] = useState("");
  ///

  const history = useHistory();

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    console.log(searchTerm);
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`;
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

  useEffect(() => {
    getData();
    if (confirm) {
      getSearch();
    } else {
      getData();
    }
  }, [confirm]);
  // useEffect(() => {
  //   if (confirm) performSearch();
  // }, [confirm]);

  const handleCardClick = (movieId) => {
    history.push(`/movies/${movieId}`);
  };

  return (
    <>
      <NaviBar />

      <SearchForm
        performSearch={performSearch}
        updateSearchTerm={updateSearchTerm}
      />
      <MenuSide />
      <div className="row">
        <div className="left-side col-2"></div>
        <div className="right-side col-10 d-flex">
          {movieList?.map((item) => (
            <Card
              className="every-card"
              onClick={() => handleCardClick(item.id)}
            >
              <Card.Img
                variant="top"
                src={`${POSTER_BASE_URL}${item.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                {/* <Card.Text>{item.overview}</Card.Text> */}
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
