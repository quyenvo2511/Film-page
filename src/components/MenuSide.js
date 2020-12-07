import React from "react";

import Filter from "./Filter";

const MenuSide = ({ movieList, setMovieList }) => {
  return (
    <div className="menuside-control d-flex">
      <ul className="menu">
        <Filter movieList={movieList} setMovieList={setMovieList} />
      </ul>
    </div>
  );
};

export default MenuSide;
