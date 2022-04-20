import React from "react";
import pic from "./pic.png";

function HomePage() {
  return (
    <div>
      <div className="first">
        <h1 className="p2e">
          A <span className="lighty">MODERN</span>
        </h1>
        <h1 className="p3e">APPROACH</h1>
        <h1 className="type">FOR AVOIDING</h1>
        <h1 className="p4e">
          <span className="lighty">LABOR</span>
        </h1>
      </div>
      <img className="image" src={pic} />
    </div>
  );
}

export default HomePage;
