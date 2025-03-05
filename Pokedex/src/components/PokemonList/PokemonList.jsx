import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Pokemon-list.css";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  async function downloadPokemon() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    // console.log(response.data)
    const pokmonResults = response.data.results;
    const pokmonPromiseResults = pokmonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokmonData = await axios.all(pokmonPromiseResults);
    const res = pokmonData.map((pokeData) => {
      const pokemon = pokeData.data;

      return {
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });

    console.log(res);
    setPokemonList(res)
    setIsLoading(false);
  }
  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemonList-wrapper">
      <div>PokemonList</div>
      {isloading ? "Pokemon Loading...." : "PokemonList Downloaded"}
    </div>
  );
};

export default PokemonList;
