import React from 'react';
import './Pokemon.css'; // Import the CSS file

const Pokemon = ({ name, image }) => {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default Pokemon;