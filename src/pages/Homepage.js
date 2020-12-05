import NaviBar from "../components/NaviBar";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "../components/SearchForm";
import MenuSide from "../components/MenuSide";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const HomePage = () => {
  const API_KEY = "8bb27996f17866f8d8aa2ee7f2bb50aa";
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";
  const TRAILER_BASE_URL = "https://www.youtube.com/embed/";
  const [movieList, setMovieList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  /// capture searchConfirm
  const [searchTerm, setSearchTerm] = useState("");
  const [confirm, setConfirm] = useState("");
  ///
  const [movieTrailer, setMovieTrailer] = useState(null);

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    console.log(searchTerm);
  };

  const heartList = () => {};
  const getData = async () => {
    try {
      setIsLoading(true);
      const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`;
      const res = await fetch(API_URL);
      const data = await res.json();
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

  const trailer = async (movie_id) => {
    // console.log("here", movie_id);
    try {
      setIsLoading(true);
      const API_URL = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`;
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("movies trailer", data.results[0].key);
      //
      setMovieTrailer(data.results);
      //
      setIsLoading(false);
    } catch (error) {
      window.alert("Not found");
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
            <Card className="every-card">
              <Card.Img
                variant="top"
                src={`${POSTER_BASE_URL}${item.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                {/* <Card.Text>{item.overview}</Card.Text> */}
              </Card.Body>
              <Card.Footer>
                <Button onClick={() => trailer(item.id)}>Trailer</Button>
                {/* <img
                  src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg"
                  alt="heart-icon"
                  onClick={() => heartList()}
                ></img> */}
              </Card.Footer>
            </Card>
          ))}

          {!isLoading && movieTrailer ? (
            <iframe
              src={`${TRAILER_BASE_URL}${movieTrailer[0].key}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          ) : (
            <>nothing</>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
