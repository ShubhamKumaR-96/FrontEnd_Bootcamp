import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Pokemon-list.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  async function downloadPokemon() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const pokemonResults = response.data.results;

      // Fetch details for each Pokemon
      const pokemonPromiseResults = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonData = await axios.all(pokemonPromiseResults);

      // Format Pokemon data
      const formattedPokemonList = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });

      setPokemonList(formattedPokemonList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemonList-wrapper">
     
      {isloading ? (
        <p className="loading-text">Pokemon Loading....</p>
      ) : (
        <div className="pokemon-list">
          {pokemonList.map((poke) => (
            <Pokemon
              key={poke.id} // Add a unique key for each Pokemon
              name={poke.name}
              image={poke.image}
              id={poke.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;