import React from "react";

function ExperienceCard({ item }) {
  return (
    <div className="exp">
      <img className="pic" src={item.image} alt={item.description} />
      <h3>{item.name}</h3>
      <p>{item.price} 🪙</p>
      <button>Purchase</button>
    </div>
  );
}

export default ExperienceCard;
