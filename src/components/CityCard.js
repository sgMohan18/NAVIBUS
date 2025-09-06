import React from 'react';
import './CityCard.css';

const CityCard = ({ name, image }) => {
  return (
    <div className="city-card">
      <img src={image} alt={name} className="city-image" />
      <h3 className="city-name">{name}</h3>
    </div>
  );
};

export default CityCard;
