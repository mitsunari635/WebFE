import React from "react";
import "./SearchResultList.scss";
import { SearchResult } from "./SearchResult";
import CustomScrollbars from "../../../components/CustomScrollbars";

export const SearchResultList = ({ results }) => {
  return (
    <>
      {results.length > 0 && (
        <div className="result-list">
          {results.map((result, id) => {
            return <SearchResult result={result} key={id} />;
          })}
        </div>
      )}
    </>
  );
};
