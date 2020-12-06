import React from "react";
import { Dropdown } from "react-bootstrap";

const Filter = ({ movieList, setMovieList }) => {
  const compareMovieAsc = (a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  };

  const compareMovieDesc = (a, b) => {
    if (a.title < b.title) return 1;
    if (a.title > b.title) return -1;
    return 0;
  };

  const compareMovieByPopularity = (a, b) => {
    if (a.popularity < b.popularity) return -1;
    if (a.popularity > b.popularity) return 1;
    return 0;
  };

  const sortMoviesByAtoZ = (movies) => {
    return [...movies.sort(compareMovieAsc)];
  };

  const sortMoviesByZtoA = (movies) => {
    return [...movies.sort(compareMovieDesc)];
  };

  const sortMoviesByPopularity = (movies) => {
    return [...movies.sort(compareMovieByPopularity)];
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

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              sortAscending();
            }}
          >
            Name A-Z
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              sortDescending();
            }}
          >
            Name Z-A
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              sortByPopularity();
            }}
          >
            Top Rated
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Filter;
