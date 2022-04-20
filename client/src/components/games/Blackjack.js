import { React, useState } from "react";
import { v4 as uuid } from "uuid";
import timeout from "../timeout";

function Blackjack({ user, reloadUser }) {
  const faceDownCard =
    "https://opengameart.org/sites/default/files/card%20back%20red.png";
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState({ playerCards: [], dealerCards: [] });
  const [endMode, setEndMode] = useState(false);
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

  async function hitDealer() {
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
        });
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

  async function closeGame() {
    setEndMode(true);
    if (winMessage().includes("win")) {
      fetch("/users/0", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: user.points + bet }),
      })
        .then((response) => response.json())
        .then(() => {
          reloadUser();
          setBet(0);
        });
    } else {
      setBet(0);
    }
  }

  async function stand() {
    hitDealer();
    await timeout(400);
    closeGame();
  }

  let playerCardsValue = getHandValue(cards.playerCards);
  let dealerCardsValue = getHandValue(cards.dealerCards);

  if (
    !endMode &&
    ((playerCardsValue === 21 && cards.playerCards.length === 2) ||
      cards.dealerCards.length >= 5)
  ) {
    closeGame();
  } else if (
    !endMode &&
    (playerCardsValue >= 21 || cards.playerCards.length >= 5)
  ) {
    stand();
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
      return "You went over 21! You lose!";
    } else if (dealerCardsValue > 21) {
      return "Dealer went over 21! You win!";
    } else if (playerCardsValue === dealerCardsValue) {
      return "It's a tie!";
    } else if (playerCardsValue > dealerCardsValue) {
      return "Your cards beat the dealer's. You win!";
    } else {
      return "The dealer's cards beat yours. You lose!";
    }
  }

  function resetGame() {
    setCards({ playerCards: [], dealerCards: [] });
    dealInit();
  }

  function addToBet(e) {
    setBet(bet + parseInt(e.target.name));
  }

  if (deckId) {
    return (
      <div>
        <div>
          <p>
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
          </button>
          <button
            className={
              endMode ||
              cards.playerCards.length < 2 ||
              cards.dealerCards.length < 2
                ? "hidden"
                : ""
            }
            onClick={stand}
          >
            Stand
          </button>
        </div>
        <div>
          <p>
            Dealer cards
            {!endMode || cards.dealerCards === 0 ? "" : `: ${dealerCardsValue}`}
          </p>
          <div className="card-container">
            <img
              className="card"
              key={uuid()}
              src={
                cards.dealerCards[0] ? cards.dealerCards[0].image : faceDownCard
              }
              alt="card"
            ></img>
            <img
              className="card"
              key={uuid()}
              src={
                endMode && cards.dealerCards[1]
                  ? cards.dealerCards[1].image
                  : faceDownCard
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
        <button
          onClick={dealInit}
          className={cards.playerCards.length > 0 || endMode ? "hidden" : ""}
        >
          Deal
        </button>
        {endMode && cards.dealerCards.length > 0 ? <p>{winMessage()}</p> : null}
        {endMode && cards.dealerCards.length > 0 ? (
          <button onClick={resetGame}>Play again</button>
        ) : null}
        <div
          className={
            cards.playerCards.length >= 2 && cards.dealerCards.length >= 2
              ? "chip-container"
              : "hidden"
          }
        >
          <img
            onClick={addToBet}
            name={10}
            src="./black-chip.png"
            alt="chip"
            className="chip"
          />
          <p>10</p>
          <img
            onClick={addToBet}
            name={50}
            src="./black-chip.png"
            alt="chip"
            className="chip"
          />
          <p>50</p>
          <img
            onClick={addToBet}
            name={100}
            src="./black-chip.png"
            alt="chip"
            className="chip"
          />
          <p>100</p>
          <img
            onClick={addToBet}
            name={500}
            src="./black-chip.png"
            alt="chip"
            className="chip"
          />
          <p>500</p>
        </div>
        <p
          className={
            cards.playerCards.length >= 2 && cards.dealerCards.length >= 2
              ? ""
              : "hidden"
          }
        >
          Bet amount: {bet} <button onClick={() => setBet(0)}>Clear bet</button>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <p className="blackjacko">blackjack</p>
        <button className="jackbutton" onClick={getDeck}>
          Start game
        </button>
      </div>
    );
  }
}

export default Blackjack;
