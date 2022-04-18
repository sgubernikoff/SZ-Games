import React from "react";

function ExperienceCard({ item }) {
  function handleClick() {
    console.log(item.description);
  }
  return (
    <div className="exp" onClick={handleClick}>
      <img className="pic" src={item.image} alt={item.description} />
      <h3>{item.name}</h3>
      <p>{item.price} 🪙</p>
      <button>Purchase</button>
    </div>
  );
}

export default ExperienceCard;
