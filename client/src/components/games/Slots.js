import React, { Component } from "react";

import CreditBoard from "./CreditBoard";
import SlotContainer from "./SlotContainer";
import Button from "./Button";

class Slots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: 100,
      creditPayout: 0,
      gameActive: false,
      gameOver: false,
      slotDatum: ["🎰", "🎰", "🎰"],
      isWin: false,
      possibleSlots: [
        "♥️",
        "💰",
        "🎲",
        "🕹️",
        "💵",
        "👑",
        "🏆",
        "⚡️",
        "🍀",
        "🔮",
        "🎱",
        "🌈",
        "🧿",
      ],
    };
    this.getSlotData = this.getSlotData.bind(this);
    this.didWin = this.didWin.bind(this);
    this.getWeightedData = this.getWeightedData.bind(this);
  }

  // Instead of random math, possibly an array with random index.

  getWeightedData() {
    const weightedNumber = Math.floor(Math.random(0, 13) * 13);
    let returnedNumber;
    if (weightedNumber >= 9) {
      returnedNumber = Math.floor(Math.random(10, 13) * 10);
      console.log(weightedNumber);
    } else if (weightedNumber >= 6 && weightedNumber < 9) {
      returnedNumber = Math.floor(Math.random(6, 10) * 10);
    } else {
      returnedNumber = Math.floor(Math.random(1, 6) * 10);
    }
    return this.state.possibleSlots[returnedNumber];
  }

  getSlotData(creditAmount) {
    let multiplierAmount;
    switch (creditAmount) {
      case 25:
        multiplierAmount = 5;
        break;
      case 50:
        multiplierAmount = 10;
        break;
      default:
        multiplierAmount = 1;
        break;
    }

    this.setState(
      {
        slotDatum: [
          this.getWeightedData(),
          this.getWeightedData(),
          this.getWeightedData(),
        ],
        credits: this.state.credits - creditAmount,
        isWin: false,
      },
      () => {
        this.didWin(this.state.slotDatum, multiplierAmount);
      }
    );
  }

  didWin(data, multiplierAmount) {
    console.log(this.props.user.points);
    let isWin = false;
    let payOut = 0;
    let newCreditCount = this.state.credits;
    if (data[0] === data[1] && data[0] === data[2]) {
      isWin = true;
      payOut = 25 * multiplierAmount;
      newCreditCount += payOut;
      fetch("/users/0", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points: this.props.user.points + payOut * multiplierAmount,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          this.props.setUser({
            ...this.props.user,
            points: this.props.user.points,
          });
        });
    } else if (data[0] === data[1]) {
      isWin = true;
      payOut = 10 * multiplierAmount;
      newCreditCount += payOut;
      fetch("/users/0", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points: this.props.user.points + payOut * multiplierAmount,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          this.props.setUser({
            ...this.props.user,
            points: this.props.user.points,
          });
        });
    }

    if (newCreditCount <= 0) {
      return window.location.reload();
    }

    this.setState({
      credits: newCreditCount,
      creditPayout: payOut,
      isWin: isWin,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Slot Machine</h1>
        </header>
        <CreditBoard credits={this.state.credits} />
        {this.state.gameOver && <p>Game over!</p>}
        {!this.state.gameActive && (
          <div>
            <p>Press the button to play.</p>
            <button
              className="start"
              onClick={() =>
                this.setState({
                  gameActive: !this.state.gameActive,
                  gameOver: false,
                  credits: 100,
                })
              }
            >
              Start Game
            </button>
          </div>
        )}

        {this.state.gameActive && !this.state.gameOver && (
          <div>
            <SlotContainer slotDatum={this.state.slotDatum} />
            <Button
              className="credits"
              onclick={() => this.getSlotData(5)}
              creditValue={5}
              currentCredits={this.state.credits}
            />
            <Button
              className="credits"
              onclick={() => this.getSlotData(25)}
              creditValue={25}
              currentCredits={this.state.credits}
            />
            <Button
              className="credits"
              onclick={() => this.getSlotData(50)}
              creditValue={50}
              currentCredits={this.state.credits}
            />
          </div>
        )}
        {this.state.isWin && <p>You Won {this.state.creditPayout}</p>}
      </div>
    );
  }
}
export default Slots;
