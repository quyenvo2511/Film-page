import NaviBar from "../components/NaviBar";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "../components/SearchForm";
import MenuSide from "../components/MenuSide";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import api from "../apiService";

// } from "../Sorting";

const POSTER_BASE_URL = process.env.REACT_APP_POSTER_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const HomePage = () => {
  const [movieList, setMovieList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  /// capture searchConfirm
  const [searchTerm, setSearchTerm] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const totalPage = 50;
  ///

  const history = useHistory();

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    console.log(searchTerm);
  };

  const performSearch = async (e) => {
    e.preventDefault();
    setConfirm(searchTerm);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        let url = `movie/now_playing?page=${pageNum}`;
        if (confirm) {
          url = `search/movie?language=en-US&page=1&query=${confirm}`;
        }
        const data = await api.get(url);
        console.log(data);
        setMovieList(data.data.results);
        setIsLoading(false);
      } catch (error) {
        window.alert("Not found");
      }
    };
    getData();
  }, [pageNum, confirm]);

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
          <MenuSide movieList={movieList} setMovieList={setMovieList} />
        </div>
        <div className="right-side col-10 d-flex">
          {isLoading ? (
            <p>Loading</p>
          ) : (
            movieList?.map((item) => (
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
