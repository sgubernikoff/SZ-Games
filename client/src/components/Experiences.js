import React from "react";
import ExperienceCard from "./ExperienceCard";

function Experiences({ items, user, setUser }) {
  const display = items.map((item) => (
    <ExperienceCard key={item.id} item={item} user={user} setUser={setUser}/>
  ));
  return (
  <div className="grid">
    <p className={!!user ? "hidden" : ""}>Log in to buy!</p>
    {display}
  </div>
  )
}

export default Experiences;
