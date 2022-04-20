import React from "react";

function Casino({isLoggedIn}) {
  return (
    <div className="casino">
      <ul className="casinoList">
        <li>
          <a href="/blackjack" className={isLoggedIn ? "listo" : "listo disabled-link"}>
            ♠Blackjack♠
          </a>
        </li>
        <li className="roul">
          <a className={isLoggedIn ? "listo" : "listo disabled-link"} href="/roulette">
            ♥️Roulette♥️
          </a>
        </li>
        <li>
          <a href="/slots" className={isLoggedIn ? "listo" : "listo disabled-link"}>
            🎰Slots🎰
          </a>
        </li>
      </ul>
      {
        isLoggedIn ? null : <p>Must be logged in to play</p>
      }
      {/* <img src="https://t4.ftcdn.net/jpg/00/35/95/11/360_F_35951128_hziAO2oE84R5BTln1TWroTDrWZSh14LZ.jpg"></img>
      <img src="https://images.theconversation.com/files/147757/original/image-20161128-22748-1couruj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop"></img>
      <img src="https://congrexprojects.com/wp-content/uploads/2021/08/Managing-new-launches-Get-inspired-with-spins-and-slots-by-Twin-City.jpg"></img> */}
    </div>
  );
}

export default Casino;
