import React, { Component, useState } from "react";
import "./SearchBar.scss";
import supabase from "./Supabase";
import { useHistory } from "react-router-dom";

export const SearchBar = ({ setResults }) => {
  const history = useHistory();
  const [input, setInput] = useState("");
  const fetchData = async (value) => {
    try {
      const { data: Products, error } = await supabase
        .from("Products")
        .select("name, id");
      if (error) {
        console.error(error);
        return;
      }
      const json = JSON.stringify(Products); // Convert data to JSON
      const parsedData = JSON.parse(json);
      if (Array.isArray(parsedData)) {
        const results = parsedData.filter((product) => {
          return (
            value &&
            product &&
            ((product.name && product.name.toLowerCase().includes(value)) ||
              (product.id && product.id.toString().includes(value)))
          );
        });
        setResults(results);
      } else {
        console.error("Data is not an array");
      }
    } catch (error) {}
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <i className="fas fa-search"></i>
      <input
        type="text"
        placeholder="Tìm sản phẩm..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
    </div>
  );
};
