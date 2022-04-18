import React from "react";
import ExperienceCard from "./ExperienceCard";

function Experiences({ items }) {
  const display = items.map((item) => <ExperienceCard key={item.id} item={item} />);
  return <div>{display}</div>;
}

export default Experiences;