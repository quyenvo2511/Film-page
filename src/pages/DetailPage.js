import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NaviBar from "../components/NaviBar";
import { Card, Breadcrumb, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { getMovieDetailData } from "../DataFetcher";

const DetailPage = () => {
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";
  const TRAILER_BASE_URL = "https://www.youtube.com/embed/";
  const API_KEY = "8bb27996f17866f8d8aa2ee7f2bb50aa";
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewList, setReviewList] = useState(null);
  const params = useParams();
  const MOVIE_ID = params.id;
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

  const getReview = async (review_id) => {
    try {
      setIsLoading(true);

      const API_URL = `https://api.themoviedb.org/3/review/${review_id}?api_key=${API_KEY}`;
      const res = await fetch(API_URL);
      const data = await res.json();

      console.log("WHAT IS", data);
      setReviewList(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Not found");
    }
  };

  useEffect(() => {
    if (isLoading) {
      getMovieDetail();
    } else {
      getReview();
    }
  }, []);
  return isLoading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <div className="control-detailpage">
      <div className="nav-bar-1">
        <NaviBar />
      </div>
      <div class="link">
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <section className="all-in">
        <div className="Detail-film d-flex">
          <div className="col-6 photo">
            <Card.Img
              variant="top"
              src={`${POSTER_BASE_URL}${movieDetail.poster_path}`}
            />
            <Button onClick={() => trailer(movieDetail.id)}>Trailer</Button>
            {!isLoading && movieTrailer ? (
              <iframe
                src={`${TRAILER_BASE_URL}${movieTrailer[0].key}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            ) : (
              <></>
            )}
          </div>
          <div className="col-6 infor">
            <span className="type-film">{movieDetail.genres[0].name}</span>
            <h1>{movieDetail.original_title}</h1>
            <div className="control-icon d-flex">
              <ul className="d-flex">
                <li>
                  <i class="fab fa-imdb imb-icon" aria-hidden="true">
                    <span class="imb-score">{movieDetail.vote_average}</span>
                  </i>
                </li>
                <i class="fas fa-users users-icon" aria-hidden="true">
                  <span class="imb-score">{movieDetail.popularity}</span>
                </i>
              </ul>
            </div>
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
        </div>
      </section>
      <section className="cmt">
        <div className="overview">
          <h1>Overview: </h1>
          <p>{movieDetail.overview}</p>
        </div>
        <div className="comment-review">
          <h1>REVIEW({})</h1>
        </div>
      </section>
    </div>
  );
};

export default DetailPage;
