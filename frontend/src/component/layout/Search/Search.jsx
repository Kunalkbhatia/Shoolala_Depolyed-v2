import React, { useState , Fragment } from "react";
import {useNavigate} from 'react-router-dom'
import "../Search/Search.css";
const Search = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim('')) {
      navigate(`/products/${keyword}`)
    } else {
     navigate("/products");
    }
  };

  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="FIND YOU PERFECT PAIR"
          onChange={(event) => setKeyword(event.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
