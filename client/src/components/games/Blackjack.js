import {React, useState} from 'react';
import { v4 as uuid } from 'uuid';
import timeout from "../timeout";

function Blackjack() {
  const faceDownCard = "https://opengameart.org/sites/default/files/card%20back%20red.png";
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [houseCards, setHouseCards] = useState([]);
  const [endMode, setEndMode] = useState(false);

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

  function cardValueConvert(card, noAceValue) {
    if (card === "ACE") {
      if (noAceValue <= 10) return 11;
      else return 1;
    }
    else if (!parseInt(card)) return 10
    else return parseInt(card);
  }

  function getHandValue(hand) {
    let handAces = hand.filter(card => card.value === "ACE");
    if (handAces.length > 1) {
      handAces.slice(1).forEach(card => card.value = "1");
    }
    let cardsValue = hand.filter(card => card.value !== "ACE").map(card => cardValueConvert(card.value, 0)).reduce((a,b) => a+b, 0);
    cardsValue = cardsValue + hand.filter(card => card.value === "ACE").map(card => cardValueConvert(card.value, cardsValue)).reduce((a,b) => a+b, 0);
    return cardsValue;
  }

  function hitDealer () {
    if (houseCardsValue <= 16) {
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
      .then(response => response.json())
      .then(cardData => {
        if (getHandValue([...houseCards, cardData.cards[0]]) >= 17) {
          setHouseCards([...houseCards, cardData.cards[0]]);
        }
        else if (getHandValue([...houseCards, cardData.cards[0], cardData.cards[1]]) >= 17) {
          setHouseCards([...houseCards, cardData.cards[0], cardData.cards[1]]);
        }
        else {
          setHouseCards([...houseCards, cardData.cards[0], cardData.cards[1], cardData.cards[2]]);
        }
      });
    }
  }

  async function closeGame() {
    await timeout(500);
    setEndMode(true);
  }

  function stand() {
    hitDealer();
    closeGame();
  }

  function hitPlayer() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(response => response.json())
    .then(cardData => {
      setPlayerCards([...playerCards, cardData.cards[0]]);
    })
  }

  let playerCardsValue = getHandValue(playerCards);
  let houseCardsValue = getHandValue(houseCards);

  if (playerCardsValue >= 21 || playerCards.length >= 5) {
    hitDealer();
    closeGame();
  }
  
  function winMessage() {
    if (playerCardsValue > 21) {
      return "You went over 21! You lose!";
    }
    else if (houseCardsValue > 21) {
      return "Dealer went over 21! You win!";
    }
    else if (playerCardsValue === houseCardsValue) {
      return "It's a tie!";
    }
    if (playerCardsValue === 21 && playerCards.length === 2) {
      return "BLACKJACK! You win!";
    }
    else if (playerCardsValue > houseCardsValue) {
      return "Your cards beat the dealer's. You win!";
    }
    else {
      return "The dealer's cards beat yours. You lose!";
    }
  }

  function resetGame() {
    setPlayerCards([]);
    setHouseCards([]);
    setEndMode(false);
    dealInit();
  }

  if (deckId) {
    return (
      <div>
        <div className={(playerCards.length > 0 && houseCards.length > 0) ? "player-cards" : "hidden"}>
          <p>Player cards: {playerCardsValue}</p>
          {
            playerCards.map(card => {
              return <img className="card" key={uuid()} src={card.image} alt="card"></img>
            })
          }
          <button className={endMode ? "hidden" : ""} onClick={hitPlayer}>Hit</button>
          <button className={endMode ? "hidden" : ""} onClick={stand}>Stand</button>
        </div>
        <div className={(playerCards.length > 0 && houseCards.length > 0) ? "house-cards" : "hidden"}>
          <p>Dealers cards {endMode ? `: ${houseCardsValue}`: ""}</p>
          {
            houseCards.slice(0,1).map(card => {
              return <img className="card" key={uuid()} src={card.image} alt="card"></img>
            })
          }
          {
            houseCards.slice(1).map(card => {
              return <img className="card" key={uuid()} src={endMode ? card.image : faceDownCard} alt="card"></img>
            })
          }
        </div>
        <button onClick={dealInit} className={playerCards.length > 0 ? "hidden" : ""} >Deal</button>
        {
          (endMode && houseCards.length > 0) ? <p>{winMessage()}</p> : null
        }
        {
          (endMode && houseCards.length > 0) ? <button onClick={resetGame}>Play again</button> : null
        }
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