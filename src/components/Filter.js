import React from "react";

const Filter = () => {
  return (
    <div>
      <div className="sort-control">
        <span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </span>
      </div>
      <div className="sort">
        <div className="sort-dropdown">
          <h4>Sort Results By</h4>
        </div>
      </div>
      <div class="filter-section closed">
        <div>
          <h2>Filter</h2>
          <span>
            <i class="fas fa-arrow-right" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
