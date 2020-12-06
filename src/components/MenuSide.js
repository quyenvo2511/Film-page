import React from "react";
import { Dropdown } from "react-bootstrap";

const MenuSide = () => {
  return (
    <div className="menuside-control d-flex">
      <ul className="menu">
        <li className="nav-item">
          <a className="badge-1" href="#">
            Top rated
          </a>
        </li>
        <li className="nav-item">
          <a className="badge-2" href="#">
            Trending now
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuSide;
