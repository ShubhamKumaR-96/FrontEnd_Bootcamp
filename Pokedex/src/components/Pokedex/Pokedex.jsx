import React from "react";
import Search from "../Search/Search";
import "./Pokedex.css";

const Pokedex = () => {
  return (
    <div className="pokedex-wrapper">
      <h1 className="pokedex-heading">Pokedex </h1>
      <Search />
    </div>
  );
};

export default Pokedex;
