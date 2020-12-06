import React from "react";
import { Dropdown } from "react-bootstrap";

import Filter from "./Filter";

const MenuSide = ({ sortAsc, sortDesc, sortPopular, yearRange, setYearRange, ratingRange, setRatingRange  }) => {
  return (
    <div className="menuside-control d-flex">
      <ul className="menu">
        {/* <li className="nav-item">
          <a className="badge-1" href="#">
            Top rated
          </a>
        </li>
        <li className="nav-item">
          <a className="badge-2" href="#">
            Trending now
          </a>
        </li> */}
        <Filter  sortAsc={sortAsc} sortDesc={sortDesc} sortPopular={sortPopular} yearRange={yearRange} setYearRange={setYearRange} ratingRange={ratingRange} setRatingRange={setRatingRange} />
      </ul>
    </div>
  );
};

export default MenuSide;
