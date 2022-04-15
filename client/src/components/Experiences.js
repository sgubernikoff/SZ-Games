import React from "react";
import Experience from "./Experience";

function Experiences({ items }) {
  const display = items.map((item) => <Experience key={item.id} item={item} />);
  return <div>{display}</div>;
}

export default Experiences;
