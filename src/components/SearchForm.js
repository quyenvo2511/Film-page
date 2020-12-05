import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const SearchForm = ({ performSearch, updateSearchTerm }) => {
  return (
    <div>
      <Form inline onSubmit={performSearch}>
        <FormControl
          type="text"
          placeholder="Search"
          className=" mr-sm-2"
          onChange={(event) => updateSearchTerm(event.target.value)}
        />
        <Button type="submit">Search</Button>
      </Form>
    </div>
  );
};

export default SearchForm;
