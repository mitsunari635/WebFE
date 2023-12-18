import React, { useEffect } from "react";
import "./SearchResult.scss";
import { useHistory } from "react-router-dom";

export const SearchResult = ({ result }) => {
  const history = useHistory();

  const handleClick = async () => {
    // Check if the result object exists and has a name property
    if (result && result.id) {
      try {
        // const response = await getDetailInforProduct(result.id, result.name);
        // Navigate to a different route using the name parameter
        history.push(`/chi-tiet-san-pham/${result.id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChooseItem = async (e) => {
    if (result && result.id && e.key === "Enter") {
      try {
        // const response = await getDetailInforProduct(result.id, result.name);
        // Navigate to a different route using the name parameter
        history.push(`/chi-tiet-san-pham/${result.id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleChooseItem(e);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="search-result"
      onClick={handleClick}
      onKeyDown={(e) => handleChooseItem(e)}
    >
      {result && result.name}
    </div>
  );
};
