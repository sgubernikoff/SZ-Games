import React from "react";

function About() {
  return (
    <div className="about">
      <div className="categories">
        {" "}
        - PLAY -
        <p>
          <span>PLAY!</span> one of our many categories at your leisure. Enjoy
          the free functionality before we roll out our Pay to Play
          functionality!
        </p>
      </div>
      <div className="categories">
        {" "}
        - WIN -{" "}
        <p>
          Everyone loves a winner, so go out there and <span>WIN!</span> Winning
          games will lead to earning points towards your account. These points
          will be very valuable moving forward!
        </p>
      </div>
      <div className="categories">
        {" "}
        - SPEND -{" "}
        <p>
          <span>SPEND!</span> those hard earned points on our lucrative prizes.
          Within weeks of winning simple arcade games, you can find yourself on
          a helicopter ride over NYC. Seems to good to be true? Try it out
          yourself!
        </p>
      </div>
      <img
        className="slotto"
        src="https://thumbs.gfycat.com/OldfashionedTenderFalcon-max-1mb.gif"
      ></img>
    </div>
  );
}

export default About;
