import React, { useState, useEffect } from "react";
import "./Search.css";
import { searchShowByTitle } from "../api";

export default function Search(props) {
  const { selectShow } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm && searchTerm.length >= 3) {
        searchShowByTitle(searchTerm).then(res => {
          setSearchError(res.Error || false);
          setSearchResults(res.Search || []);
        });
      }
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="searchView">
      <h1>Rewatcher</h1>
      <div className="searchBar">
        <label htmlFor="search">Search a TV show: </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="results">
        {searchError && (
          <p className="errorMessage">Your search didn't return any results</p>
        )}
        {searchResults.map(show => {
          return (
            <button
              className="showCard"
              key={show.imdbID}
              onClick={() => selectShow(show.imdbID)}
            >
              <div title={show.Title} className="showTitle">
                {show.Title}
              </div>{" "}
              ({show.Year})
              <img src={show.Poster} alt={show.Title} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
