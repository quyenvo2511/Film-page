import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NaviBar from "../components/NaviBar";
import { Card, Breadcrumb, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertMsg from "../components/AlertMsg";
import { toast } from "react-toastify";

import { getMovieDetailData } from "../DataFetcher";

const DetailPage = () => {
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";
  const TRAILER_BASE_URL = "https://www.youtube.com/embed/";
  const API_KEY = "8bb27996f17866f8d8aa2ee7f2bb50aa";
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewList, setReviewList] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  const params = useParams();
  const MOVIE_ID = params.id;
  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const handleOpenTrailer = () => {
    setShowTrailer(true);
  };

  const getMovieDetail = async () => {
    try {
      setIsLoading(true);
      const movie = await getMovieDetailData(MOVIE_ID);
      console.log(movie);
      setMovieDetail(movie);
      setIsLoading(false);
    } catch (error) {
      window.alert("not found");
    }
  };

  const getReview = async () => {
    try {
      setIsLoading(true);

      const API_URL = `https://api.themoviedb.org/3/movie/${MOVIE_ID}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
      const res = await fetch(API_URL);
      const data = await res.json();

      console.log("WHAT IS", data);
      setReviewList(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log("Not found");
    }
  };

  const getTrailer = async () => {
    try {
      setIsLoading(true);
      const API_URL = `https://api.themoviedb.org/3/movie/${MOVIE_ID}/videos?api_key=${API_KEY}&language=en-US`;
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("movies trailer", data.results[0].key);
      //
      setMovieTrailer(data.results);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      getMovieDetail();
      getTrailer();
    } else {
      getReview();
    }
  }, []);

  return isLoading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <>
      <div className="control-detailpage">
        <div className="nav-bar-1">
          <NaviBar />
        </div>
        <div className="link">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">
              {movieDetail.original_title}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <section className="all-in">
          <div className="Detail-film d-flex">
            <div className="col-6 photo">
              <Card.Img
                variant="top"
                src={`${POSTER_BASE_URL}${movieDetail.poster_path}`}
              />
            </div>
            <div className="col-6 infor">
              <span className="type-film">{movieDetail.genres[0].name}</span>
              <div className="movie-title">
                <h1>{movieDetail.original_title}</h1>
                <h4>{movieDetail.tagline}</h4>
              </div>
              <div className="d-flex control">
                <div>
                  <i class="fab fa-imdb imb-icon" aria-hidden="true">
                    <span class="imb-score">{movieDetail.vote_average}</span>
                  </i>
                </div>
                <div>
                  <i class="fas fa-users users-icon" aria-hidden="true">
                    <span class="imb-score-1">{movieDetail.popularity}</span>
                  </i>
                </div>
              </div>
              <div className="text-group">
                <p>
                  <b>Release Date: </b>
                  {movieDetail.release_date}
                </p>
                <p>
                  <b>Time remaining: </b>
                  {movieDetail.runtime} minutes
                </p>
                <p>
                  <b>Languages: </b>
                  {movieDetail.spoken_languages[0].english_name}
                </p>
              </div>
              <div className="control-fav-list">
                <Button className="button-trailer" onClick={handleOpenTrailer}>
                  Trailer
                </Button>
                <button
                  class="details-action-icon"
                  onClick={() => {
                    const movieAdded = sessionStorage.getItem(MOVIE_ID);
                    if (movieAdded !== null) {
                      toast.info("The movie is already added to My List");
                    } else {
                      sessionStorage.setItem(MOVIE_ID, MOVIE_ID);
                      toast.success("added");
                    }
                  }}
                >
                  <AlertMsg />
                  <i className="fas fa-heart black" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="cmt">
          <div className="overview">
            <h2>Overview</h2>
            <p>{movieDetail.overview}</p>
          </div>
          <div className="comment-review">
            <h2>Review ({reviewList.length})</h2>
            {reviewList.map((review) => (
              <div>
                <h2>{review.author_details.username}</h2>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Modal show={showTrailer} size="xl" onHide={handleCloseTrailer}>
        <Modal.Header closeButton>
          <Modal.Title>{movieDetail.original_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movieTrailer ? (
            <iframe
              src={`${TRAILER_BASE_URL}${movieTrailer[0].key}`}
              width="100%"
              height="900"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          ) : (
            <p>No Trailer Found For This Movie</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTrailer}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailPage;
