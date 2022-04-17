import React from "react";

function ExperienceCard({ item }) {
  
  return (
    <div className="exp">
      <img src={item.image} alt={item.description} />
      <h3>{item.name}</h3>
      <p>{item.price} coins</p>
    </div>
  );
}

export default ExperienceCard;
