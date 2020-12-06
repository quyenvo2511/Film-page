import React from "react";

import Filter from "./Filter";

const MenuSide = () => {
  return (
    <div className="menuside-control d-flex">
      <ul className="menu">
        <Filter />
      </ul>
    </div>
  );
};

export default MenuSide;
