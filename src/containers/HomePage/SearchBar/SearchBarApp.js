import React, { useState } from "react";
import  {SearchBar}  from "./SearchBar";
import { SearchResultList } from "./SearchResultList";

function SearchBarApp() {
  const [results, setResults] = useState([]);

  return (
    <div className="SearchBarApp">
      <SearchBar setResults={setResults} />
      <SearchResultList results={results} />
    </div>
  );
}

export default SearchBarApp;
