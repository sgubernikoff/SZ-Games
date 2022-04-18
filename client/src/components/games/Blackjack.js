import {React, useState, useEffect} from 'react';
import { v4 as uuid } from 'uuid';

function Blackjack() {
  const faceDownCard = "https://opengameart.org/sites/default/files/card%20back%20red.png";
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [houseCards, setHouseCards] = useState([]);
  const [playerCardValue, setPlayerCardValue] = useState(0);

  function getDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(response => response.json())
    .then(deckData => setDeckId(deckData.deck_id));
  }

  function dealInit() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
    .then(response => response.json())
    .then(cardData => {
      setPlayerCards([cardData.cards[0], cardData.cards[1]]);
      setHouseCards([cardData.cards[2], cardData.cards[3]]);
    });
  }

  function cardValueConvert(card) {
    if (card === "ACE") {
      if (playerCardValue <= 10) return 11;
      else return 1;
    }
    else if (!parseInt(card)) return 10
    else return parseInt(card);
  }

  console.log(playerCards.filter(card => card.value !== "ACE").map(card => cardValueConvert(card.value)));

  if (deckId) {
    return (
      <div>
        <div className={playerCards.length > 0 ? "player-cards" : "hidden"}>
          <p>Player cards</p>
          {
            playerCards.map(card => {
              return <img className="card" key={uuid()} src={card.image} alt="card"></img>
            })
          }
        </div>
        <div className={houseCards.length > 0 ? "house-cards" : "hidden"}>
          <p>House cards</p>
          {
            houseCards.slice(0,1).map(card => {
              return <img className="card" key={uuid()} src={card.image} alt="card"></img>
            })
          }
          {
            houseCards.slice(1).map(card => {
              return <img className="card" key={uuid()} src={faceDownCard} alt="card"></img>
            })
          }
        </div>
        <button onClick={dealInit}>Deal</button>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>Blackjack</p>
        <button onClick={getDeck}>Start game</button>
      </div>
    )
  }
}

export default Blackjack