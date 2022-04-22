import { React, useState } from "react";
import { v4 as uuid } from "uuid";
import timeout from "../timeout";

const chips = [
  { value: "5", image: "./black-chip.png" },
  { value: "10", image: "./brown-chip.png" },
  { value: "25", image: "./green-chip.png" },
  { value: "50", image: "./greener-chip.png" },
];

function Roulette({ user, setUser }) {
  const [spin, setSpin] = useState(null);
  const [currentChip, setCurrentChip] = useState(null);
  const [bets, setBets] = useState({});
  const [credits, setCredits] = useState(250);

  function spinWheel() {
    fetch("/spins/0")
      .then((response) => response.json())
      .then((spinData) => {
        setSpin(spinData);
      });
  }

  function getChip(e) {
    if (currentChip === e.target.name) {
      setCurrentChip(null);
    } else {
      setCurrentChip(e.target.name);
    }
  }

  function makeBet(e) {
    if (
      e.target.className.includes("clickable") ||
      e.target.parentNode.className.includes("clickable")
    ) {
      if (currentChip && betsTotal + parseInt(currentChip) <= credits) {
        let betsCopy = { ...bets };
        betsCopy[e.target.getAttribute("name")] = parseInt(currentChip);
        setBets(betsCopy);
      }
    }
  }

  function boardElement(cls, text, name) {
    return (
      <div
        className={Object.keys(bets).includes(name) ? `${cls} no-text` : cls}
        name={name}
      >
        {text}
        {Object.keys(bets).includes(name) ? (
          <img
            onClick={removeBet}
            src={
              chips.find((chip) => parseInt(chip.value) === bets[name]).image
            }
            alt="chip"
            className="table-chip"
          />
        ) : null}
      </div>
    );
  }

  function removeBet(e) {
    let betsCopy = { ...bets };
    delete betsCopy[e.target.parentNode.getAttribute("name")];
    setBets(betsCopy);
  }

  const betsTotal = Object.values(bets).reduce((a, b) => a + b, 0);

  async function calculateWinnings() {
    await timeout(5000);
    let winnings = 0;
    if (Object.keys(bets).includes(spin.value)) {
      winnings = winnings + bets[spin.value] * 35;
    }
    if (Object.keys(bets).includes(spin.color)) {
      winnings = winnings + bets[spin.color];
    }
    if (Object.keys(bets).includes(spin.half)) {
      winnings = winnings + bets[spin.half];
    }
    if (Object.keys(bets).includes(spin.parity)) {
      winnings = winnings + bets[spin.parity];
    }
    if (Object.keys(bets).includes(spin.row)) {
      winnings = winnings + bets[spin.row] * 2;
    }
    if (Object.keys(bets).includes(spin.third)) {
      winnings = winnings + bets[spin.third] * 2;
    }
    fetch("/users/0", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ points: user.points + winnings }),
    })
      .then((response) => response.json())
      .then((user) => {
        setSpin(null);
        setUser({ ...user, points: user.points });
        setCredits(credits - betsTotal);
        setBets(0);
        setCurrentChip(null);
      });
  }

  if (spin) {
    calculateWinnings();
  }

  return (
    <div>
      <div className="board_hold">
        <div className="roulette-board" onClick={spin ? null : makeBet}>
          <div className="container-first">
            <div name="0" className="clickable zero-item">
              {boardElement("value", "0", "0")}
            </div>
            <div name="1" className="clickable red-item">
              {boardElement("value", "1", "1")}
            </div>
            <div name="2" className="clickable black-item">
              {boardElement("value", "2", "2")}
            </div>
            <div name="3" className="clickable red-item">
              {boardElement("value", "3", "3")}
            </div>
            <div name="4" className="clickable black-item">
              {boardElement("value", "4", "4")}
            </div>
            <div name="5" className="clickable red-item">
              {boardElement("value", "5", "5")}
            </div>
            <div name="6" className="clickable black-item">
              {boardElement("value", "6", "6")}
            </div>
            <div name="7" className="clickable red-item">
              {boardElement("value", "7", "7")}
            </div>
            <div name="8" className="clickable black-item">
              {boardElement("value", "8", "8")}
            </div>
            <div name="9" className="clickable red-item">
              {boardElement("value", "9", "9")}
            </div>
            <div name="10" className="clickable black-item">
              {boardElement("value", "10", "10")}
            </div>
            <div name="11" className="clickable black-item">
              {boardElement("value", "11", "11")}
            </div>
            <div name="12" className="clickable red-item">
              {boardElement("value", "12", "12")}
            </div>
            <div name="13" className="clickable black-item">
              {boardElement("value", "13", "13")}
            </div>
            <div name="14" className="clickable red-item">
              {boardElement("value", "14", "14")}
            </div>
            <div name="15" className="clickable black-item">
              {boardElement("value", "15", "15")}
            </div>
            <div name="16" className="clickable red-item">
              {boardElement("value", "16", "16")}
            </div>
            <div name="17" className="clickable black-item">
              {boardElement("value", "17", "17")}
            </div>
            <div name="18" className="clickable red-item">
              {boardElement("value", "18", "18")}
            </div>
            <div name="19" className="clickable red-item">
              {boardElement("value", "19", "19")}
            </div>
            <div name="20" className="clickable black-item">
              {boardElement("value", "20", "20")}
            </div>
            <div name="21" className="clickable red-item">
              {boardElement("value", "21", "21")}
            </div>
            <div name="22" className="clickable black-item">
              {boardElement("value", "22", "22")}
            </div>
            <div name="23" className="clickable red-item">
              {boardElement("value", "23", "23")}
            </div>
            <div name="24" className="clickable black-item">
              {boardElement("value", "24", "24")}
            </div>
            <div name="25" className="clickable red-item">
              {boardElement("value", "25", "25")}
            </div>
            <div name="26" className="clickable black-item">
              {boardElement("value", "26", "26")}
            </div>
            <div name="27" className="clickable red-item">
              {boardElement("value", "27", "27")}
            </div>
            <div name="28" className="clickable black-item">
              {boardElement("value", "28", "28")}
            </div>
            <div name="29" className="clickable black-item">
              {boardElement("value", "29", "29")}
            </div>
            <div name="30" className="clickable red-item">
              {boardElement("value", "30", "30")}
            </div>
            <div name="31" className="clickable black-item">
              {boardElement("value", "31", "31")}
            </div>
            <div name="32" className="clickable red-item">
              {boardElement("value", "32", "32")}
            </div>
            <div name="33" className="clickable black-item">
              {boardElement("value", "33", "33")}
            </div>
            <div name="34" className="clickable red-item">
              {boardElement("value", "34", "34")}
            </div>
            <div name="35" className="clickable black-item">
              {boardElement("value", "35", "35")}
            </div>
            <div name="36" className="clickable red-item">
              {boardElement("value", "36", "36")}
            </div>
            <div name="row1" className="clickable column-item">
              {boardElement("value", "2-1", "row1")}
            </div>
            <div name="row2" className="clickable column-item">
              {boardElement("value", "2-1", "row2")}
            </div>
            <div name="row3" className="clickable column-item">
              {boardElement("value", "2-1", "row3")}
            </div>
          </div>
          <div className="container-second">
            <div name="doz1" className="clickable doz-item">
              {boardElement("botton-table", "1st 12", "doz1")}
            </div>
            <div name="doz2" className="clickable doz-item">
              {boardElement("botton-table", "2nd 12", "doz2")}
            </div>
            <div name="doz3" className="clickable doz-item">
              {boardElement("botton-table", "3rd 12", "doz3")}
            </div>
          </div>
          <div className="container-third">
            <div name="half1" className="clickable outside-section">
              {boardElement("botton-table", "1-18", "half1")}
            </div>
            <div name="even" className="clickable outside-section">
              {boardElement("botton-table", "EVEN", "even")}
            </div>
            <div name="red" className="clickable outside-section">
              {boardElement("rhomb-red", "", "red")}
            </div>
            <div name="black" className="clickable outside-section">
              {boardElement("rhomb-black", "", "black")}
            </div>
            <div name="odd" className="clickable outside-section">
              {boardElement("botton-table", "ODD", "odd")}
            </div>
            <div name="half2" className="clickable outside-section">
              {boardElement("botton-table", "19-36", "half2")}
            </div>
          </div>
        </div>
        <button onClick={spinWheel}>Spin</button>
        <div className="chip-container">
          {chips.map((chip) => {
            return (
              <div key={uuid()}>
                <img
                  onClick={getChip}
                  name={chip.value}
                  src={chip.image}
                  alt="chip"
                  className={
                    currentChip === chip.value ? "current-chip" : "chip"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <p>Credits: ${credits - betsTotal}</p>
      <div className="score_hold">
        {spin ? <p className={spin.color}>{spin.value}</p> : null}
      </div>
    </div>
  );
}

export default Roulette;
