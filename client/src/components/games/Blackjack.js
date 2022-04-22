import { React, useState } from "react";
import { v4 as uuid } from "uuid";

const chips = [{value: "5", image: "./black-chip.png"}, {value: "10", image: "./brown-chip.png"}, {value: "25", image: "./green-chip.png"}, {value: "50", image: "./greener-chip.png"}]

function Blackjack({ user, setUser }) {
  const faceDownCard =
    "https://opengameart.org/sites/default/files/card%20back%20red.png";
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState({ playerCards: [], dealerCards: [] });
  const [endMode, setEndMode] = useState(false);
  const [credits, setCredits] = useState(250);
  const [bet, setBet] = useState(0);

  function getDeck() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
      .then((response) => response.json())
      .then((deckData) => setDeckId(deckData.deck_id));
  }

  function dealInit() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
      .then((response) => response.json())
      .then((cardData) => {
        setCards({
          playerCards: [cardData.cards[0], cardData.cards[1]],
          dealerCards: [cardData.cards[2], cardData.cards[3]],
        });
        setEndMode(false);
      });
  }

  function cardValueConvert(card, noAceValue) {
    if (card === "ACE") {
      if (noAceValue <= 10) return 11;
      else return 1;
    } else if (!parseInt(card)) return 10;
    else return parseInt(card);
  }

  function getHandValue(hand) {
    if (hand.length === 0) return 0;
    let handAces = hand.filter((card) => card.value === "ACE");
    if (handAces.length > 1) {
      handAces.slice(1).forEach((card) => (card.value = "1"));
    }
    let cardsValue = hand
      .filter((card) => card.value !== "ACE")
      .map((card) => cardValueConvert(card.value, 0))
      .reduce((a, b) => a + b, 0);
    cardsValue =
      cardsValue +
      hand
        .filter((card) => card.value === "ACE")
        .map((card) => cardValueConvert(card.value, cardsValue))
        .reduce((a, b) => a + b, 0);
    return cardsValue;
  }

  function hitDealer() {
    setEndMode(true);
    if (dealerCardsValue <= 16) {
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
        .then((response) => response.json())
        .then((cardData) => {
          if (getHandValue([...cards.dealerCards, cardData.cards[0]]) >= 17) {
            setCards({
              ...cards,
              dealerCards: [...cards.dealerCards, cardData.cards[0]],
            });
          } else if (
            getHandValue([
              ...cards.dealerCards,
              cardData.cards[0],
              cardData.cards[1],
            ]) >= 17
          ) {
            setCards({
              ...cards,
              dealerCards: [
                ...cards.dealerCards,
                cardData.cards[0],
                cardData.cards[1],
              ],
            });
          } else {
            setCards({
              ...cards,
              dealerCards: [
                ...cards.dealerCards,
                cardData.cards[0],
                cardData.cards[1],
                cardData.cards[2],
              ],
            });
          }
          closeGame();
        });
    }
    else {
      closeGame();
    }
  }

  function hitPlayer() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((response) => response.json())
      .then((cardData) => {
        setCards({
          ...cards,
          playerCards: [...cards.playerCards, cardData.cards[0]],
        });
      });
  }

  function closeGame() {
    if (winMessage().includes("win")) {
      fetch("/users/0", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: user.points + bet }),
      })
      .then(response => response.json())
      .then((user) => {
        setUser({...user, points: user.points});
      })
    }
    else if (winMessage().includes("lose")) {
      setCredits(credits - bet);
      setBet(0);
    }
  }

  let playerCardsValue = getHandValue(cards.playerCards);
  let dealerCardsValue = getHandValue(cards.dealerCards);

  if (
    !endMode &&
    ((playerCardsValue === 21 && cards.playerCards.length === 2) ||
      cards.dealerCards.length >= 5)
  ) {
    setEndMode(true);
    closeGame();
  } else if (
    !endMode &&
    (playerCardsValue >= 21 || cards.playerCards.length >= 5)
  ) {
    hitDealer();
  }

  function winMessage() {
    if (
      playerCardsValue === 21 &&
      cards.playerCards.length === 2 &&
      (dealerCardsValue !== 21 || cards.dealerCards.length !== 2)
    ) {
      return "BLACKJACK! You win!";
    } else if (
      playerCardsValue <= 21 &&
      cards.playerCards.length === 5 &&
      (dealerCardsValue !== 21 || cards.dealerCards.length !== 2)
    ) {
      return "You drew 5 cards without going over 21. You win!";
    } else if (playerCardsValue > 21) {
      return "You bust! You lose!";
    } else if (dealerCardsValue > 21) {
      return "Dealer bust! You win!";
    } else if (playerCardsValue === dealerCardsValue) {
      return "It's a tie!";
    } else if (playerCardsValue > dealerCardsValue) {
      return "You beat the dealer. You win!";
    } else {
      return "You lose!";
    }
  }

  function resetGame() {
    setCards({ playerCards: [], dealerCards: [] });
    dealInit();
  }

  function addToBet(e) {
    if (credits >= (bet + parseInt(e.target.name))) {
      setBet(bet + parseInt(e.target.name));
    }
  }

  function endGame() {
    setDeckId(null)
    setCards({ playerCards: [], dealerCards: [] });
    setEndMode(false);
    setCredits(2500);
    setBet(0);
  }

  function doubleBet() {
    if (credits >= bet*2) {
      setBet(bet*2);
      hitPlayer();
      
    }
  }

  if (deckId) {
    return (
      <div>
        <div>
          <p className={cards.playerCards.length === 0 ? "hidden" : ""} >
            Player cards{playerCardsValue === 0 ? "" : `: ${playerCardsValue}`}
          </p>
          <div className="card-container">
            {[...Array(5).keys()].map((index) => {
              return (
                <img
                  className="card"
                  key={uuid()}
                  src={
                    cards.playerCards[index]
                      ? cards.playerCards[index].image
                      : "/rectangle.jpeg"
                  }
                  alt="card"
                ></img>
              );
            })}
          </div>
          <br></br>
          <div className="side-button-container">
          <button
            className={
              endMode ||
              cards.playerCards.length < 2 ||
              cards.dealerCards.length < 2
                ? "hidden"
                : ""
            }
            onClick={hitPlayer}
          >
            Hit
          </button><br></br>
          <button
            className={
              endMode ||
              cards.playerCards.length < 2 ||
              cards.dealerCards.length < 2
                ? "hidden"
                : ""
            }
            onClick={hitDealer}
          >
            Stand
          </button>
          </div>
        </div>
        <div>
          <p className={cards.dealerCards.length === 0 ? "hidden" : ""}>
            Dealer cards
            {!endMode || cards.dealerCards === 0 ? "" : `: ${dealerCardsValue}`}
          </p>
          <div className="card-container">
            <img
              className="card"
              key={uuid()}
              src={
                cards.dealerCards[0] ? cards.dealerCards[0].image : "./rectangle.jpeg"
              }
              alt="card"
            ></img>
            <img
              className="card"
              key={uuid()}
              src={
                cards.dealerCards[1] ? endMode ? cards.dealerCards[1].image : 
                faceDownCard : "./rectangle.jpeg"
              }
              alt="card"
            ></img>
            {[...Array(3).keys()].map((index) => {
              return (
                <img
                  className="card"
                  key={uuid()}
                  src={
                    endMode && cards.dealerCards[index + 2]
                      ? cards.dealerCards[index + 2].image
                      : "./rectangle.jpeg"
                  }
                  alt="card"
                ></img>
              );
            })}
          </div>
        </div>
        {endMode && cards.dealerCards.length > 0 ? <p>{winMessage()}</p> : null}
        <button onClick={endMode ? resetGame : dealInit} className={(cards.playerCards.length && !endMode) > 0 ? "hidden" : ""}>{endMode ? "Redeal" : "Deal"}</button>
        {endMode ? <button onClick={endGame}>End game</button> : null}
        <div className={(cards.playerCards.length > 0 && !endMode) ? "disabled-link chip-container" : "chip-container"}>
        {
          chips.map(chip => {
            return <div key={uuid()}><img onClick={addToBet} name={chip.value} src={chip.image} alt="chip" className="chip"/></div>
          })
        }
      </div>
        <p className="bet-info">
          Bet amount: {bet} <button onClick={(cards.playerCards.length > 0 && !endMode) ? doubleBet : () => setBet(0)} className={(cards.playerCards.length > 2 && !endMode) ? "disabled-link" : ""} >{(cards.playerCards.length > 0 && !endMode) ? "Double bet": "Clear bet"}</button> Credits: ${credits - bet}
        </p>
      </div>
    );
  } else {
    return (
      <div>
        {/* <p className="blackjacko">blackjack</p> */}
        <div>
          <img
            className="chipz"
            src="https://s3.amazonaws.com/gameartpartnersimagehost/wp-content/uploads/2020/03/spinRight-256.gif"
          alt="spinning chip"/>
        </div>
        <button className="jackbutton" onClick={getDeck}>
          Start game
        </button>
      </div>
    );
  }
}

export default Blackjack;
