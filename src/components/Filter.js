import React from "react";
import { Dropdown } from "react-bootstrap";
import InputRange from "react-input-range";

const MIN_YEAR = 1990;
const MAX_YEAR = 2020;

const MIN_RATING = 0;
const MAX_RATING = 10;

const Filter = ({
  sortAsc,
  sortDesc,
  sortPopular,
  yearRange,
  setYearRange,
  ratingRange,
  setRatingRange,
}) => {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              sortAsc();
            }}
          >
            Name A-Z
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              sortDesc();
            }}
          >
            Name Z-A
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              sortPopular();
            }}
          >
            Top Rated
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="range-filter">
        <InputRange
          minValue={MIN_YEAR}
          maxValue={MAX_YEAR}
          value={yearRange}
          onChange={(value) => setYearRange(value)}
        />
      </div>
      <div className="range-filter">
        <InputRange
          minValue={MIN_RATING}
          maxValue={MAX_RATING}
          value={ratingRange}
          onChange={(value) => setRatingRange(value)}
        />
      </div>
    </>
  );
};

export default Filter;
